import React, { useEffect, useState } from 'react'; // importo librerias necesarias
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct, setCurrentPage, setCategoryFilter } from '../store/actions/productActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';



const ProductList = () => { // componente que muestra la lista de productos
  const dispatch = useDispatch(); // hook para disparar acciones de Redux
  const products = useSelector(state => state.products.products) || []; // obtengo los productos
  const [productIdToDelete, setProductIdToDelete] = useState(null); //guardaa el id del producto a eliminar
  const navigate = useNavigate();
  const currentPage = useSelector(state => state.products.currentPage);
  const itemsPerPage = 6;
  const categoryFilter = useSelector(state => state.products.categoryFilter);
  


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  const handleConfirmDelete = () => { // manejo la confirmación de la eliminacion de un producto
    if (productIdToDelete !== null) {
      dispatch(deleteProduct(productIdToDelete)); // ejecuto la accion de borrar
      setProductIdToDelete(null); // resetea el id seleccionado
    }
  };


  const filteredProducts = categoryFilter === 'Todos'
  ? products
  : products.filter(p => p.category === categoryFilter);


  // calculo para paginación
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); //filtrado
 

  //cantidad total de paginas
  const totalPages = Math.ceil(products.length / itemsPerPage);


  return (  //mostrar productos y filtrado
    <div className="container">
      <h2 className="mb-4">Lista de Productos</h2>

      <div className="mb-3">
      <label htmlFor="categoryFilter" className="form-label">Filtrar por categoría:</label>
      <select
        id="categoryFilter"
        className="form-select"
        value={categoryFilter}
        onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
      >
        <option value="Todos">Todos</option>
        {[...new Set(products.map(p => p.category))].map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
        </select>
      </div>

      {products.length === 0 ? (
        <p>No hay productos disponibles</p>) : (
      
        <div className="row">
          {currentProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Precio: ${product.price}</p>
                  <p className="card-text">Stock: {product.stock}</p>
                  <p className="card-text">Categoría: {product.category}</p>

                  <Link to={`/products/${product.id}`} className="btn btn-info"> Ver Detalles</Link>


                  {/* botones eliminar y editar */}
                  <button
                    className='btn btn-danger mt-2'
                    data-bs-toggle="modal"
                    data-bs-target="#confirmDeleteModal"
                    onClick={() => setProductIdToDelete(product.id)}
                  >
                    Eliminar
                  </button>

                  <button className="btn btn-warning mt-2 ms-2" onClick={() => navigate(`/edit/${product.id}`)}>
                     Editar
                    </button>
                </div>
              </div>
            </div>
          ))}

         
          {/* confirmacion de eliminar producto */}
          <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmDeleteModalLabel">Confirmar eliminación</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div className="modal-body">
                  ¿Segura que quieres eliminar este producto?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                    data-bs-dismiss="modal"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
         
         {/* paginacion */}
          <div className="d-flex justify-content-center mt-4">
          <nav>
          <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => dispatch(setCurrentPage(currentPage - 1))}>Anterior</button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => dispatch(setCurrentPage(index + 1))}>
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => dispatch(setCurrentPage(currentPage + 1))}>Siguiente</button>
          </li>
        </ul>
          </nav>
        </div>

        </div>
      )}
    </div>
  );
};

export default ProductList;
