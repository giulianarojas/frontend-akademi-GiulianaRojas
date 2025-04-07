import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import Navbar from './components/NavBar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
    return (
       <Provider store={store}>
        <Router>
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<ProductList />} />
                    <Route path='/add-product' element={<AddProduct />} />
                </Routes>

            </div>
        </Router>

       </Provider>
    );
};

export default App;