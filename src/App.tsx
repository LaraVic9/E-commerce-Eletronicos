import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Category } from './script';
import { cart, heart, search, truck, card, box, cart_white, phone_svg, laptop_svg, tv_svg, mouse_svg, headphone_svg } from './assets/icons'
import { two_headphone, headphone, mouse, banner, logo, headphone_lado, celular, tv, notebook, headphone_preto, banner_2, visa, mastercard, paypal } from './assets/images';


import { Home, AddProduct, AddCategory, EditCategory, EditProduct, ProductsFilter }  from './views'

function App() {
  return (
    <>
    <div className=''>
       {/* nav */}
        <nav className="navbar navbar-expand-lg bg-light fixed-top px-4 justify-content-between">
            <div className='d-flex'>

              <a className="navbar-brand fw-bold text-white" href="#">
                <img src={logo} alt="Logo" height="40" className="me-2" />
              </a>

              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" href="/">Início</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/produtos">Produtos</a>
                  </li>
                 
                </ul>
              </div>
            </div>
            <div className='d-flex'>
                <div className='mx-2'>
                    <img src={search} />
                </div>
                <div className='mx-2'>
                    <img src={cart} />
                </div>
                <div className='mx-2'>
                    <img src={heart} />
                </div>
            </div>
            
        </nav>

      {/* rotas/ router */}
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<ProductsFilter />} />
          <Route path="/produtos/novo" element={<AddProduct />} />
          <Route path="/produtos/editar/:id" element={<EditProduct />} />
          <Route path="/categorias/novo" element={<AddCategory />} />
          <Route path="/categorias/editar/:id" element={<EditCategory />} />
        </Routes>
      </Router>

        {/* Footer */}
        <footer className="bg-[#F0F0F0] text-gray-800 d-flex justify-content-center align-items-center flex-column margin">

          {/* formulario */}
          <div className="bg-black text-white rounded-xl w-75 p-4 d-flex justify-content-center align-items-center rounded" style={{ marginBottom: '-80px', zIndex:'1' }}>
            
            <div className='flex'>
              <h2 className="text-2xl md:text-3xl font-bold w-75">
                FIQUE POR DENTRO DAS NOSSAS ÚLTIMAS OFERTAS
              </h2>
            </div>
            
            <div className="d-flex flex-col md:flex-row gap-2 flex-column">
              <input
                type="email"
                placeholder="Digite seu endereço de e-mail"
                className="px-4 py-3 rounded-full w-full md:w-auto flex-1 text-black rounded"
              />
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold">
                  Entrar para a Comunidade Tech
              </button>
            </div>
          </div>

          {/*main */}
          <div style={{ backgroundColor: '#f6f6f6', paddingTop:'120px' }} className='w-100 px-5 d-flex justify-content-center align-items-center'>
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 d-flex">
            
              <div className="md:col-span-1 w-75">
              <a className="navbar-brand fw-bold text-white" href="#">
                  <img src={logo} alt="Logo" height="80" className="me-2" />
                </a>
                <p className="text-sm mb-4">
                Do básico ao high-tech, temos os eletrônicos que acompanham seu ritmo.
                </p>
                <div className="flex gap-3">
                  <button className="text-black hover:text-gray-600">
                    <i className="fab fa-twitter" />
                  </button>
                  <button className="text-black hover:text-gray-600">
                    <i className="fab fa-facebook" />
                  </button>
                  <button className="text-black hover:text-gray-600">
                    <i className="fab fa-instagram" />
                  </button>
                </div>
              </div>
            
          </div>

         
          <div className="border-t border-gray-300 py-6 text-center text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center px-6 max-w-6xl mx-auto">
            <p>EcommerceEletronics.co © 2000-2023, Todos os direitos reservados</p>
            <div className="flex gap-3 mt-4 md:mt-0">
              <img src={visa} alt="Visa" className="mx-2 h-6" height='30px' />
              <img src={mastercard} alt="MasterCard" className="mx-2 h-6" height='30px' />
              <img src={paypal} alt="PayPal" className="mx-2 h-6" height='30px' />
            </div>
          </div>
        </div>
          
        </footer>   
    </div>
    
      
    </>
  );
}

export default App;
