import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../store/actions/productActions';

export default function Home() {
  const products = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {Array.isArray(products) && products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price} (Stock: {product.stock})</li>
        ))}
      </ul>
    </div>
  );
}
