const { Router } = require('express');
const route = Router();

// Importar métodos del controlador
const {
  productoGet,
  productoPost,
  productoPut,
  productoDelete
} = require('../controllers/producto');

route.get('/:id', productoGet);
route.get('/', productoGet);
route.post('/', productoPost);
route.put('/', productoPut);
route.delete('/', productoDelete);

module.exports = route;