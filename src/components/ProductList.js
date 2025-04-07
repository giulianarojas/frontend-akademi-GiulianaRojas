import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products) || [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container">
    <h2 className="mb-4">Lista de Productos</h2>
    {products.length === 0 ? (
      <p>No hay productos disponibles</p> 
    ) : (
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <p className="card-text">Categoría: {product.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default ProductList;
