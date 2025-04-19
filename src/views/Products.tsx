import { useEffect, useState } from 'react';
import { api } from '../service/api';
import { Product, Category } from '../script';
import { getProducts, createProduct } from '../service/productService';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [newProduct, setNewProduct] = useState('');
    const [newCategory, setNewCategory] = useState<number | ''>('');

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const fetchCategories = async () => {
        try {
          const res = await api.get('/categories');
          setCategories(res.data);
        } catch (e) {
          console.error('Erro ao buscar produtos:', e);
        }
      };
      
      const handleCreate = async () => {
        if (!newProduct.trim() || !newCategory) return;
      
        try {
          await createProduct({ name: newProduct, categoryId: newCategory });
          setNewProduct('');
          setNewCategory('');
          fetchProducts();
        } catch (e) {
          console.error('Erro ao criar produto: ', e);
          alert('Erro ao criar o produto. Tente novamente');
        }
      };
      
      useEffect(() => {
        fetchProducts();
        fetchCategories();
      }, []);

      return (
        <div>
          <h2>Produtos</h2>
            <div>
            <input
              type="text"
              placeholder="Nome do produto"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(Number(e.target.value))}
            >
              <option value="">Selecione a categoria</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button onClick={handleCreate}>Adicionar Produto</button>
          </div>
    
         
          <ul>
            {products.map((p) => (
              <li key={p.id}>
                {p.name} - {categories.find((c) => c.id === p.categoryId)?.name}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Products;