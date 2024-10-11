import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsHome from './pages/products';
import ProductDetails from './pages/products/details';
import ProductCreate from './pages/products/create';
import ProductEdit from "./pages/products/edit";
import CategoriesHome from './pages/categories';
import CategoriesCreate from './pages/categories/create';
import CategoriesDetails from './pages/categories/details';
import CategoryEdit from './pages/categories/edit';
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsHome />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/categories" element={<CategoriesHome />} />
        <Route path="/categories/create" element={<CategoriesCreate />} />
        <Route path="/categories/:id" element={<CategoriesDetails />} />
        <Route path="/categories/:id/edit" element={<CategoryEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
