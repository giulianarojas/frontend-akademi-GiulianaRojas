//importo dependencias 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //componente para manejar rutas
import { Provider } from 'react-redux'; //provider para que toda la app tenga acceso al store
import store from './store/store' 

//los componentes que vamos a usar en las rutas
import Navbar from './components/NavBar';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProduct';



const App = () => {
    return (
       <Provider store={store}>
        <Router>
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<ProductList />} />
                    <Route path='/add-product' element={<AddProductForm />} />
                </Routes>

            </div>
        </Router>

       </Provider>
    );
};

export default App;