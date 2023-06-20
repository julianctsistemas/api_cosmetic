const { Router } = require('express');
const route = Router();

// Importar métodos del controlador
const {
  empleadoGet,
  empleadoPost,
  empleadoPut,
  empleadoDelete
} = require('../controllers/empleado');

route.get('/:id', empleadoGet);
route.get('/', empleadoGet);
route.post('/', empleadoPost);
route.put('/', empleadoPut);
route.delete('/', empleadoDelete);

module.exports = route;