import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct } from '../store/actions/productActions';


// reutilizable para renderizar campos de formulario con validación
const renderInput = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className="mb-2">
    <input {...input} type={type} placeholder={placeholder} className="form-control" />
    {touched && error && <small className="text-danger">{error}</small>}
  </div>
);

//formulario principal
const EditProductForm = ({ handleSubmit, initialize }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector(state => state.products.products);
  const product = products.find(p => p.id.toString() === id);


  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    } else if (product) {
      initialize(product); 
    }
  }, [dispatch, products, product, initialize]);

  const onSubmit = (values) => {  // enviar el formulario
    dispatch(updateProduct({ ...values, id }));
    navigate('/');
  };


  //estructura visual del formulario
  return (
    <div className="container mt-4">
      <h4>Editar Producto</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="name" component={renderInput} type="text" placeholder="Nombre" />
        <Field name="price" component={renderInput} type="number" placeholder="Precio" />
        <Field name="stock" component={renderInput} type="number" placeholder="Stock" />
        <Field name="category" component={renderInput} type="text" placeholder="Categoría" />
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

//validacion
const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Requerido';
  if (!values.price) errors.price = 'Requerido';
  if (!values.stock) errors.stock = 'Requerido';
  if (!values.category) errors.category = 'Requerido';
  return errors;
};

export default reduxForm({ //exporta con reduxForm
  form: 'EditProduct',
  validate,
})(EditProductForm);
