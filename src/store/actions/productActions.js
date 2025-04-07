import axios from 'axios';
import { FETCH_PRODUCTS } from './types';


//cargar productos desde el json server
export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3000/products');
            dispatch({type: FETCH_PRODUCTS, payload: data});
        } catch (error) {
            console.error('Error:', error);
        }
    };
};


//agregar producto
