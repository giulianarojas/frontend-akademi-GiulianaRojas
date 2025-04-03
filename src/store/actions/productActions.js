import axios from 'axios';

export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products
});