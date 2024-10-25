import axios from 'axios';
import { API_URL } from './config';

export const getUserById = async (userId: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const getFeed = async (userId: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/api/feed/get_feed`, { userId });
  return response.data;
};

export const updateUserById = async (userId: string, userData: any): Promise<any> => {
  const response = await axios.put(`${API_URL}/user/${userId}`, userData);
  return response.data;
};

export const deleteUserById = async (userId: string): Promise<any> => {
  const response = await axios.delete(`${API_URL}/user/${userId}`);
  return response.data;
};
