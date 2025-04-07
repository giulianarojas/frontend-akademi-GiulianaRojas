import React from 'react'; // importo react y los hooks/formularios necesarios
import { Field, reduxForm } from 'redux-form'; //para crear campos del form y reduxForm para conectar con Redux
import { useDispatch } from 'react-redux';
import { AddProduct } from '../store/actions/productActions'; // accion que agrega un producto
import { useNavigate } from 'react-router-dom';  // hook para redirigir despues de agregar un product

//componente para renderizar cada input del formulario
const renderInput = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className="mb-2">
    <input {...input} type={type} placeholder={placeholder} className="form-control" />
    {touched && error && <small className="text-danger">{error}</small>}
  </div>
);

//componente principal del formulario
const AddProductForm = ({ handleSubmit, reset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // para redirigir

  const onSubmit = (values) => {
    const newProduct = {
      name: values.name,
      price: parseFloat(values.price),  // convierto a decimal
      stock: parseInt(values.stock),  // convierto a entero
      category: values.category,
    };
    dispatch(AddProduct(newProduct)); // disparamos la accion con el producto nuevo
    reset(); // limpia el formulario
    navigate('/');  //redirige
  };


  //renderizado del formulario
  return (
    <div className="container mt-4">
      <h4>Agregar Producto</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="name" component={renderInput} type="text" placeholder="Nombre" />
        <Field name="price" component={renderInput} type="number" placeholder="Precio" />
        <Field name="stock" component={renderInput} type="number" placeholder="Stock" />
        <Field name="category" component={renderInput} type="text" placeholder="Categoría" />
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

// validacion
const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Requerido';
  if (!values.price) errors.price = 'Requerido';
  if (!values.stock) errors.stock = 'Requerido';
  if (!values.category) errors.category = 'Requerido';
  return errors;
};

export default reduxForm({
  form: 'AddProduct',
  validate,
})(AddProductForm);
