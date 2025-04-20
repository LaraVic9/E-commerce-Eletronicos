import { useEffect, useState } from 'react';
import { api } from '../service/api';
import { Product, Category } from '../script';
import { getProducts, createProduct } from '../service/productService';
import headphone from '../assets/images/headphone.png';
import './views.css';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState('');
  const [newCategory, setNewCategory] = useState<string | ''>('');
  const [newImage, setNewImage] = useState('');
  const [newPrice, setNewPrice] = useState<number | ''>(''); // Novo estado

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (e) {
      console.error('Erro ao buscar categorias:', e);
    }
  };

  const handleCreate = async () => {
    if (!newProduct.trim() || !newCategory || !newImage.trim() || newPrice === '') return;

    try {
      await createProduct({ 
        name: newProduct, 
        categoryId: newCategory, 
        image: newImage, 
        price: Number(newPrice) // Inclui o preço
      });

      // Limpa os campos após criação
      setNewProduct('');
      setNewCategory('');
      setNewImage('');
      setNewPrice('');
    } catch (e) {
      console.error('Erro ao criar produto: ', e);
      alert('Erro ao criar o produto. Tente novamente');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h2>Produtos</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do produto"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            <option value="">Selecione a categoria</option>
            {categories.map((c) => (
              <option key={String(c.id)} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="URL da imagem"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Preço (ex: 1299.99)"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
          />
        </div>

        <button className="btn btn-primary" onClick={handleCreate}>
          Adicionar Produto
        </button>
      </div>
    </>
  );
};

export default Products;
