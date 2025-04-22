import { useEffect, useState } from 'react';
import { getProducts } from '../service/productService';
import { getCategories } from '../service/categoryService';
import { Product, Category } from '../script';
import cart from '../assets/images/cart.png'
import { cart_white } from '../assets/icons'
import { Slider } from '@mui/material';

const ProductFilter = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

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

  const filteredProducts = products.filter(product => {
    const isInCategory = selectedCategories.length
      ? selectedCategories.includes(String(product.categoryId))
      : true;
  
    const isInPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
  
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  
    return isInCategory && isInPriceRange && matchesSearch;
  });


  return (
    <div className=" mt-4 p-5">

      <div className="row mt-4 flex justify-content-center">
        
        {/* categorias */}
        <div className="col-md-2 border rounded p-3 filtros">

          <h5 className='mb-4'>Filtros:</h5>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar produto por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <p className='mb-2'>Categorias:</p>
            {categories.map(category => (
              <div className="form-check m-2 " key={category.id}>
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
        
            <div className="mt-4 mx-2">
              <p className="mb-2">Preço:</p>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
              />
              <div className="d-flex justify-content-between">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>
          
        </div>

        {/* produtos */}
        <div className="col-md-9">
          <div
            className="grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
            }}
          >
            {filteredProducts.map(p => {
              const category = categories.find(c => String(c.id) === String(p.categoryId));
              return (
                <div className="card border h-100 shadow" key={String(p.id)}>
                  {p.image && (
                    <div className="bg-product d-flex align-items-center">
                      <img
                        className="card-img-top mx-auto d-block"
                        src={getImage(p.image)}
                        alt={p.name}
                        style={{ width: '215px', height: 'auto' }}
                      />
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title h6">{p.name}</h5>
                    <p className="text">{category?.name ?? 'Categoria não encontrada'}</p>
                    <div className="d-flex justify-content-between">
                      <div className="flex align-content-end flex-wrap">
                        <p className="p-0 m-0">R$ {p.price}</p>
                      </div>
                      <div className="cart p-2 ml-auto d-flex align-content-center justify-content-center">
                        <img src={cart_white} width="20px" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length < 4 &&
              Array.from({ length: 4 - filteredProducts.length }).map((_, i) => (
                <div key={`empty-${i}`} style={{ visibility: 'hidden' }}></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
