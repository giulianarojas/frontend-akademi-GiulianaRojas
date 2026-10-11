# Frontend Akademi - Gestión de Inventario

Aplicación en React con Redux Clásico para gestionar un inventario de productos tecnológicos.

## Tecnologías Utilizadas

- React.js
- Redux Clásico
- React Router
- Redux Thunk
- JSON Server
- Bootstrap 5
- Axios

## Características

- ✅ CRUD completo de productos (Alta, Baja, Modificación)
- ✅ Paginación (5 productos por página)
- ✅ Filtrado por categoría
- ✅ Búsqueda por nombre o categoría
- ✅ Ordenamiento por precio y nombre (ascendente/descendente)
- ✅ Vista de detalle de producto con edición en línea
- ✅ Validaciones de formularios (precio > 0, stock >= 0)
- ✅ JSON Server como API REST simulada

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

## Ejecución

Para ejecutar la aplicación, necesitas iniciar tanto el servidor de desarrollo de React como JSON Server.

### Terminal 1 - Iniciar JSON Server
```bash
npm run server
```
Esto iniciará JSON Server en http://localhost:3001

### Terminal 2 - Iniciar React
```bash
npm start
```
Esto iniciará la aplicación en http://localhost:3000

## Estructura del Proyecto

```
src/
├── api/
│   └── api.js                 # Configuración de Axios
├── components/
│   ├── AddProduct.js          # Formulario de alta
│   ├── NavBar.js              # Barra de navegación
│   ├── ProductDetail.js       # Vista de detalle y edición
│   └── ProductList.js         # Lista de productos con filtros
├── store/
│   ├── actions/
│   │   ├── productActions.js  # Acciones de Redux
│   │   └── types.js           # Tipos de acciones
│   ├── reducers/
│   │   └── productReducer.js  # Reducer de productos
│   └── store.js               # Configuración del store
├── App.js                     # Rutas de la aplicación
└── index.js                   # Punto de entrada
```

## Modelo de Datos

### Producto
- `id`: Identificador único
- `name`: Nombre del producto
- `category`: Categoría (ej: laptop, celular, etc.)
- `price`: Precio (debe ser mayor a 0)
- `stock`: Stock disponible (no puede ser negativo)
- `description`: Descripción del producto

## Rutas

- `/` - Lista de productos principal
- `/add-product` - Formulario para agregar nuevo producto
- `/products/:id` - Detalle y edición de producto

## JSON Server Endpoints

- `GET /products` - Listar todos los productos
- `POST /products` - Agregar nuevo producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

## Scripts Disponibles

- `npm start` - Inicia la aplicación en modo desarrollo
- `npm run server` - Inicia JSON Server
- `npm test` - Ejecuta tests
- `npm run build` - Construye para producción
