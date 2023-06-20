//Migracion 
const {Schema, model}=require('mongoose')


const CategoriaProductoSchema = Schema({
   
    nombre: {
        type: String,
        required: [true, 'El Nombre es requerido'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z]+$/.test(value);
            },
            message: 'El nombre debe contener solo letras'
        }
    },
    
    estado: {
        type: String,
        enum: ['true', 'false'],
        required: [true, 'El estado es requerido']
    },
    
});


//este es el nombre del objeto Ambiente
module.exports = model('CategoriaProducto', CategoriaProductoSchema)//Exportar el modelo

