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

export default axiosInstance;
