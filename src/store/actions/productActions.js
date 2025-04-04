import axios from 'axios';

export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products
});

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            dispatch(setProducts(response.data));
        } catch (error) {
            console.error('Error:', error);
        }
    };
};