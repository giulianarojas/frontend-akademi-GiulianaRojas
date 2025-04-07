const initialState = {
  products: [],
  currentPage: 1,
  itemsPerPage: 5,
  categoryFilter: 'Todos',
};

// reducer que maneja las acciones relacionadas con productos
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':  // accion para obtener todos los productos (desde una API o base de datos)
      return {
        ...state, // copio el estado anterior
        products: action.payload, // actualizo la lista de productos con los nuevos
      };
    case 'DELETE_PRODUCT':  // accion para eliminar un producto especifico (por su id)
      return {
        ...state, 
        products: state.products.filter(p => p.id !== action.payload),  // filtrotodos los productos excepto el que tenga el id igual al que quiero eliminar
      };
      case 'ADD_PRODUCT':  // accion para agregar un nuevo producto al estado
      return { ...state, products: [...state.products, action.payload] 
      };

    case 'EDIT_PRODUCT':
      return {
        ...state, products: state.products.map(product => product.id === action.payload.id ? action.payload : product),
    };

    case 'SET_CURRENT_PAGE':
    return {
      ...state,
      currentPage: action.payload
    };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        categoryFilter: action.payload,
        currentPage:1,
      }
    default:
      return state;
  }
};

export default productReducer;

