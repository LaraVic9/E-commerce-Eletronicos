import { api } from './api';
import { Category } from '../script';

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get('/categories');
  return res.data;
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  const res = await api.post('/categories', category);
  return res.data;
};
