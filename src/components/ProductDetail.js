import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; //obtener el id desde la URL
import { useSelector, useDispatch } from 'react-redux'; // acceder al store y despachar acciones
import { fetchProducts, updateProduct } from '../store/actions/productActions'; // traer los productos y actualizar

//función para limpiar puntos del precio
const cleanPrice = (price) => {
  if (typeof price === 'number') return price;
  return parseFloat(price.toString().replace(/\./g, '').replace(',', '.'));
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products); // obtengo la lista de productos
  const product = products.find(p => p.id.toString() === id); //aqui use toString() para asegurar que comparacion funcione aunque el id sea string o nro

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
        description: product.description || ''
      });
    }
  }, [product]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
        description: product.description || ''
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert('Todos los campos son requeridos');
      return;
    }

    const priceNum = cleanPrice(formData.price);
    const stockNum = parseInt(formData.stock);

    if (priceNum <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    if (stockNum < 0) {
      alert('El stock no puede ser negativo');
      return;
    }

    const updatedProduct = {
      id: id,
      name: formData.name,
      price: priceNum,
      stock: stockNum,
      category: formData.category,
      description: formData.description || ''
    };

    dispatch(updateProduct(id, updatedProduct));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!product) {
    return <div className="container mt-4"><p>Cargando producto...</p></div>;
  }

   // si ya tengo el producto lo muestro
  return (
    <div className="container mt-4">
      {!isEditing ? (
        <>
          <h2>{product.name}</h2>
          <p><strong>Precio:</strong> ${parseFloat(product.price).toLocaleString('es-AR')}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Descripción:</strong> {product.description || 'Sin descripción'}</p>
          <button className="btn btn-warning mt-3" onClick={handleEdit}>Editar</button>
          <button className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/')}>Volver</button>
        </>
      ) : (
        <>
          <h2>Editar Producto</h2>
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                placeholder="Precio (ej: 500.000)"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock:</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancelar</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
