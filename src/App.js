import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import ProductList from './components/ProductList';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/agregar-producto" element={<h2 className="container mt-4">Pag para agregar producto (en proceso)</h2>} />
            </Routes>
        </>
    );
};

export default App;