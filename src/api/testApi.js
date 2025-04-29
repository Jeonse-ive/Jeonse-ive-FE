import axiosInstance from './axiosInstance';

export const getTest = async () => {
  const response = await axiosInstance.get('/api/test');
  return response.data;
};