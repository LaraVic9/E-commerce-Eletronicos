import { useEffect, useState } from 'react';
import { api } from '../service/api';
import { Product, Category } from '../script';
import { getProducts, createProduct } from '../service/productService';
import './views.css';
import { cart, heart, search, truck, card, box, cart_white, phone_svg, laptop_svg, tv_svg, mouse_svg, headphone_svg } from '../assets/icons'
import { two_headphone, headphone, mouse, banner, logo, headphone_lado, celular, tv, notebook, headphone_preto, banner_2 } from '../assets/images';
import { getCategories } from '../service/categoryService';

const svgIcons: Record<string, string> = {
  phone_svg,
  laptop_svg,
  tv_svg,
  mouse_svg,
  headphone_svg,
};

const Home = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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
  

  

  return (
    <>
     
      <div className=''>
        {/* banner */}
        <div className="promo-banner container-fluid p-0">
          <div className="position-relative">
            <img src={banner} alt="Black Friday Promo" className="banner" />
          </div>
        </div>

        {/* servicos */}
        <div className='d-flex justify-content-center margin'>
          
          <div className=' d-flex w-25'>
            <div className='mx-4 border rounded-circle d-flex align-items-center justify-content-center servico-img p-3'>
              <img src={truck} width='33px'/>
            </div>
            <div className='flex align-content-end flex-wrap'>
              <h5 className='m-0'>Entrega Rápida</h5>
              <p className='text'>Receba seu pedido em até 48h nas principais cidades.</p>
            </div>
          </div>

          <div className=' d-flex w-25'>
            <div className='mx-4 border rounded-circle d-flex align-items-center justify-content-center servico-img'>
              <img src={card} width='30px'/>
            </div>
            <div className='flex align-content-end flex-wrap w-50'>
              <h5 className='m-0'>Compra Segura</h5>
              <p className='text'>Ambiente protegido com criptografia de ponta a ponta.</p>
            </div>
          </div>

          <div className=' d-flex w-25'>
            <div className='mx-4 border rounded-circle d-flex align-items-center justify-content-center servico-img'>
              <img src={box} width='30px'/>
            </div>
            <div className='flex align-content-end flex-wrap w-50'>
              <h5 className='m-0'>Troca Garantida</h5>
              <p className='text'>Você tem até 7 dias para trocar sem complicação.</p>
            </div>
          </div>
        </div>

        {/* destaques */}
        <div className='d-flex justify-content-center margin'>
          
          <div className="gradient-background align-items-center m-1 destaque mx-3 position-relative" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <img
                className="card-img-top mx-auto d-block mt-3"
                src={two_headphone}
                alt="headphones"
                style={{
                  width: '340px',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />

              <div
                className="text-container position-absolute text-white"
                style={{
                  bottom: '20px',
                  left: '20px',
                }}
              >
                <p className="mb-1">5 Items</p>
                <h3 className="fw-bold">FURNITURE</h3>
                <p className="text-decoration-underline" style={{ cursor: 'pointer' }}>Read More</p>
              </div>
          </div>

          <div className="gradient-background align-items-center m-1 destaque mx-3 position-relative" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <img
                className="card-img-top mx-auto d-block mt-3"
                src={headphone_lado}
                alt="headphone_lado"
                style={{
                  width: '340px',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />

              <div
                className="text-container position-absolute text-white"
                style={{
                  bottom: '20px',
                  left: '20px',
                }}
              >
                <p className="mb-1">5 Items</p>
                <h3 className="fw-bold">HyperX Cloud Stinger Core</h3>
                <p className="text-decoration-underline" style={{ cursor: 'pointer' }}>Read More</p>
              </div>
            </div>

          <div className="gradient-background align-items-center m-1 destaque mx-3 position-relative" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <img
                className="card-img-top mx-auto d-block mt-3"
                src={mouse}
                alt="mouse"
                style={{
                  width: '340px',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />

              <div
                className="text-container position-absolute text-white"
                style={{
                  bottom: '10px',
                  left: '20px',
                }}
              >
                <p className="mb-1">5 Items</p>
                <h3 className="fw-bold">Logitech G502 HERO High
                Performance</h3>
                <p className="text-decoration-underline" style={{ cursor: 'pointer' }}>Read More</p>
              </div>
            </div>
        </div>

        {/* banner 2 */}
        <div className='margin'>
          <div className='d-flex justify-content-center align-items-center'>
            <img src={banner_2} className='w-75 rounded'/>
          </div>
        </div>

        {/* categorias */}
        <div className='d-flex justify-content-center align-items-center margin flex-column'>
          
          <div className='w-75 mb-4'>
            <h3>
              Categorias
            </h3>
          </div>
            
          <div className='d-flex w-50 d-flex justify-content-center align-items-center'>
             
          {categories
            .sort(() => Math.random() - 0.5) 
            .slice(0, 8) 
            .map(c => {
              
              return (
                <div className="col-md-3 mb-4 justify-content-center align-items-center" key={String(c.id)}>
                  <a
                  href='/produtos'
                    key={c.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                      color:'black'
                    }}
                    className='d-flex flex-column mx-5 pointer'
                  >
                    <img
                      src={svgIcons[c.svg]}
                      alt={c.svg}
                      style={{ width: '40px', height: '40px' }}
                    />
                    <span>{c.name}</span>
                  </a>
                </div>
              );
            })}

            {
            /*<div className='categoria-bg m-3 mx-4 border rounded-circle d-flex align-items-center justify-content-center p-3'>
              <img src={mouse}  style={{
                  width: '160px',
                  height: 'auto',
                  objectFit: 'cover',
                }}/>
            </div>
             
            <div className='categoria-bg m-3 mx-4 border rounded-circle d-flex align-items-center justify-content-center p-3'>
              <img src={headphone_preto}  style={{
                  width: '100px',
                  height: 'auto',
                  objectFit: 'cover',
                }}/>
            </div>
             
            <div className='categoria-bg m-3 mx-4 border rounded-circle d-flex align-items-center justify-content-center p-3'>
              <img src={celular}  style={{
                  width: '130px',
                  height: 'auto',
                  objectFit: 'cover',
                }}/>
            </div>
             
            <div className='categoria-bg m-3 mx-4 border rounded-circle d-flex align-items-center justify-content-center p-3'>
              <img src={tv}  style={{
                  width: '130px',
                  height: 'auto',
                  objectFit: 'cover',
                }}/>
            </div>
             
            <div className='categoria-bg m-3 mx-4 border rounded-circle d-flex align-items-center justify-content-center p-3'>
              <img src={notebook}  style={{
                  width: '150px',
                  height: 'auto',
                  objectFit: 'cover',
                }}/>
            </div>*/}

          </div>
        </div>

        {/* produtos */}
        <div className='d-flex justify-content-center align-items-center'>
          <div className='mt-4 flex-column w-75'>
            <h3>
              Produtos Recomendados
            </h3>

            <div className='row mt-4'>
              
              {
                products
                .sort(() => Math.random() - 0.5)
                .slice(0, 8)
                .map(p => {
                  const category = categories.find(
                    c => String(c.id) === String(p.categoryId)
                  );
                  return (
                    <div className="col-md-3 mb-4 " key={String(p.id)}>
                      
                      <div className="card border h-100 shadow">
                        {p.image && (
                          <div  className='bg-product d-flex align-items-center'>
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
                          <div className='d-flex justify-content-between'>
                            <div className='flex align-content-end flex-wrap'>
                                <p className='p-0 m-0'>R$ {p.price}</p>
                            </div>
                            <div className='cart p-2 ml-auto d-flex align-content-center justify-content-center'>
                            {<img src={cart_white} width="20px"></img>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {products.length === 0 && (
                  <div className="col-12">
                    <p>Nenhum produto encontrado.</p>
                  </div>
                )}
            </div>

          </div>
        </div>

      </div>
     
    </>
  );
};

export default Home;