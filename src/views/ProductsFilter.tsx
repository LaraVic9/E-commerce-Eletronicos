import { useEffect, useState } from 'react';
import { getProducts } from '../service/productService';
import { getCategories } from '../service/categoryService';
import { Product, Category } from '../script';
import cart from '../assets/images/cart.png'

const ProductFilter = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    // aqui resolvi o problema do vite com as iamgens do json, depois de muita dor de cabeca achei essa solucao
    const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg}', {
      eager: true,
      import: 'default',
    });
    
    const getImage = (filename: string) => {
      const path = `../assets/images/${filename}`;
      return images[path] as string;
    };
  
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

  useEffect(() => {
    fetchProducts();
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = selectedCategories.length
    ? products.filter(product =>
        selectedCategories.includes(String(product.categoryId))
      )
    : products;

  return (
    <div className="container mt-4">
      <h2>Produtos</h2>

      <div className="row mt-4">
        {/* Coluna de filtros */}
        <div className="col-md-3">
          <h5>Filtrar por categorias:</h5>
          {categories.map(category => (
            <div className="form-check" key={category.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={category.id}
                id={`category-${category.id}`}
                checked={selectedCategories.includes(String(category.id))}
                onChange={() => handleCategoryChange(String(category.id))}
              />
              <label className="form-check-label" htmlFor={`category-${category.id}`}>
                {category.name}
              </label>
            </div>
          ))}
        </div>

        {/* Coluna de produtos */}
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.map(p => {
              const category = categories.find(
                c => String(c.id) === String(p.categoryId)
              );
              return (
                <div className="col-md-3 mb-4" key={String(p.id)}>
                  <div className="card  border h-100">
                    {p.image && (
                      <div  className='gradient-background d-flex align-items-center'>
                          <img
                            className="card-img-top mx-auto d-block"
                            src={getImage(p.image)}
                            alt={p.name}
                            style={{ 
                              width: '215px',
                              height: 'auto',
                             
                            }}
                          />
                      </div>
                     
                    )}
                    <div className="card-body">
                      <h5 className="card-title h6">{p.name}</h5>
                      <p className="text">
                        {category?.name ?? 'Categoria não encontrada'}
                      </p>
                      <div className='d-flex bg-primary'>
                        <div><p>R$ {p.price}</p></div>
                        <div className='cart p-2 align-items-center ml-auto'>
                         {<img src={cart} width="20px"></img>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="col-12">
                <p>Nenhum produto encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
