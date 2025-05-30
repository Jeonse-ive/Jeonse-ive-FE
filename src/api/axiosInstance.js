// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080',  // 로컬 Spring Boot 백엔드 주소
  baseURL: 'http://54.180.157.93:8080',  // 배포 Spring Boot 백엔드 주소
  timeout: 5000,                     // 요청 시간 초과 설정 (5초)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
