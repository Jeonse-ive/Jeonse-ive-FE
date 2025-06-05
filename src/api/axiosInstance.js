// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// accessToken 자동 삽입 interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 사용자 정보 요청 (axiosInstance 사용!)
export const fetchMyInfo = async () => {
  try {
    const res = await axiosInstance.get('/api/members/me');
    console.log('내 정보:', res.data.data);
    return res.data.data;
  } catch (err) {
    console.error('사용자 정보 조회 실패:', err);
    throw err;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료된 경우 (401 + 재시도 방지 조건)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh 토큰으로 accessToken 재발급 요청
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/token/refresh`,
          {}, // POST body 없음
          {
            withCredentials: true, // 쿠키로 refreshToken 보낼 때 필요 (HttpOnly인 경우)
          }
        );

        const newAccessToken = refreshRes.data.data.accessToken;

        // 저장 및 요청 헤더에 다시 세팅
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 재요청
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        console.error('토큰 재발급 실패:', refreshErr);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // 또는 로그인 페이지
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
