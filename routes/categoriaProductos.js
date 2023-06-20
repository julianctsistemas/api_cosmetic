const { Router } = require('express');
const route = Router();

// Importar métodos del controlador
const {
  categoriaProductoGet,
  
} = require('../controllers/categoriaProducto');

route.get('/', categoriaProductoGet);


module.exports = route;