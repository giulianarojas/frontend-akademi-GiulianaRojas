import React, { useEffect, useState } from 'react'; // importo librerias necesarias
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct, setCurrentPage, setCategoryFilter, setSortBy, setSortOrder } from '../store/actions/productActions';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';



const ProductList = () => { // componente que muestra la lista de productos
  const dispatch = useDispatch(); // hook para disparar acciones de Redux
  const products = useSelector(state => state.products.products) || []; // obtengo los productos
  const [productIdToDelete, setProductIdToDelete] = useState(null); //guardaa el id del producto a eliminar
  const [searchTerm, setSearchTerm] = useState('');
  const currentPage = useSelector(state => state.products.currentPage);
  const itemsPerPage = 5;
  const categoryFilter = useSelector(state => state.products.categoryFilter);
  const sortBy = useSelector(state => state.products.sortBy);
  const sortOrder = useSelector(state => state.products.sortOrder);



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
  ? products  // si no hay filtro muestro TODOS los productos
  : products.filter(p => p.category === categoryFilter);

  // filtrado por búsqueda
  const searchedProducts = searchTerm
    ? filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  // ordenamiento
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });


  // calculo para paginación
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct); //filtrado


  //cantidad total de paginas
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);


  return (  //mostrar productos y filtrado
    <div className="container">
      <h2 className="mb-4">Lista de Productos</h2>

      <div className="mb-3">
        <label htmlFor="search" className="form-label">Buscar:</label>
        <input
          type="text"
          id="search"
          className="form-control"
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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

      <div className="mb-3">
        <label className="form-label">Ordenar por:</label>
        <div className="d-flex gap-2">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <>
          <div className="row">
            {currentProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Precio: ${parseFloat(product.price).toLocaleString('es-AR')}</p>
                    <p className="card-text">Stock: {product.stock}</p>
                    <p className="card-text">Categoría: {product.category}</p>
                    <div className="d-flex gap-2 mt-3">
                      <Link to={`/products/${product.id}`} className="btn btn-info">Ver Detalles</Link>
                      <button
                        className='btn btn-danger'
                        data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteModal"
                        onClick={() => setProductIdToDelete(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        </>
      )}

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
    </div>
  );
};

export default ProductList;
