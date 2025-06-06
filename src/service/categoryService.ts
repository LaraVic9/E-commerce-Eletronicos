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

export const updateCategory = async (id: number | string, category: Partial<Category>): Promise<Category> => {
  const res = await api.put(`/categories/${id}`, category);
  return res.data;
};

export const deleteCategory = async (id: number | string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

export const deactivateCategory = async (id: number | string): Promise<Category> => {
  const res = await api.patch(`/categories/${id}`, { active: false });
  return res.data;
};
