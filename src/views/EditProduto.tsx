import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts, updateProduct } from '../service/productService';
import { getCategories } from '../service/categoryService';
import { Product, Category } from '../script';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Omit<Product, 'id'> | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      const selectedProduct = productsData.find(p => String(p.id) === id);

      if (selectedProduct) {
        const { id, ...rest } = selectedProduct;
        setProduct(rest);
      }

      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      await updateProduct(String(id!), product); 
      alert('Produto atualizado com sucesso!');
      navigate('/products'); 
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar. Tente novamente.');
    }
  };

  if (!product) return <p>Carregando produto...</p>;

  return (
    <div className="container mt-4">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome do Produto</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagem (URL)</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={product.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <select
            name="categoryId"
            className="form-select"
            value={product.categoryId}
            onChange={handleChange}
          >
            <option value="">Selecione a categoria</option>
            {categories.map(c => (
              <option key={String(c.id)} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditProduct;
