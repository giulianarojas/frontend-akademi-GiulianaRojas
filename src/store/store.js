import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'; // para crear el store (forma compatible con versiones anteriores)
import { thunk } from 'redux-thunk';  
import { reducer as formReducer } from 'redux-form'; // reducer del formulario que maneja redux-form

import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({ //combino todos los reducers
  products: productReducer,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
