import api from '../../api/api';
import { FETCH_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT  } from './types';


//cargar productos desde el json server
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.get('/products');
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };
};

//  eliminar un producto 
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await api.delete(`/products/${id}`);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };
};

// agregar producto
export const AddProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await api.post('/products', product);
      dispatch({ type: ADD_PRODUCT, payload: data });
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };
};

  //editar producto
  export const updateProduct = (id, values) => async dispatch => {
    try {
      const response = await api.put(`/products/${id}`, values);
      dispatch({
        type: EDIT_PRODUCT,
        payload: response.data
      });
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
  };
  
  
  
