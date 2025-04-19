// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Products from './views/Products';
import { Category } from './script';
import Categories from './views/Categories';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/produtos/novo" element={<Products />} />
        <Route path="/categoria/novo" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
