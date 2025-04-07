import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; //obtener el id desde la URL
import { useSelector, useDispatch } from 'react-redux'; // acceder al store y despachar acciones
import { fetchProducts } from '../store/actions/productActions'; // traer los productos

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products); // obtengo la lista de productos
  const product = products.find(p => p.id.toString() === id); //aqui use toString() para asegurar que comparacion funcione aunque el id sea string o nro

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);


   // si ya tengo el producto lo muestro 
  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      {product.description && <p><strong>Descripción:</strong> {product.description}</p>}
      {product.image_url && <img src={product.image_url} alt={product.name} width="300" />}
    </div>
  );
};

export default ProductDetail;
