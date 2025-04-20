// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Products from './views/Products';
import { Category } from './script';
import Categories from './views/Categories';
import ProductFilter from './views/ProductsFilter';
import EditProduct from './views/EditProduto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<ProductFilter />} />
        <Route path="/produtos/novo" element={<Products />} />
        <Route path="/produtos/editar/:id" element={<EditProduct />} />
        <Route path="/categorias/novo" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
