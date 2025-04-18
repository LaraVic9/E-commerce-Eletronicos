import { api } from './api';
import { Product } from '../script';

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products');
  return res.data;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const res = await api.post('/products', product);
  return res.data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const res = await api.put(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};