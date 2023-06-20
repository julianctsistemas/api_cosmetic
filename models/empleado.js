//Migracion 
const {Schema, model}=require('mongoose')


const EmpleadoSchema = Schema({
    cedula: {
        type: String,
        required: [true, 'El documento es requerido'],
        validate: {
            validator: function(value) {
                return /^\d+$/.test(value);
            },
            message: 'La cédula debe contener solo números'
        }
    },
    nombre: {
        type: String,
        required: [true, 'El Nombre es requerido'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message: 'El nombre debe contener solo letras'
        }
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        validate: {
            validator: function(value) {
                // Expresión regular para validar el formato de correo electrónico
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: 'El correo debe ser válido'
        }
    },
    direccion: {
        type: String,
        required: [true, 'El tipo de documento es requerido']
    },

    telefono: {
        type: String,
        required: [true, 'El teléfono es requerido'],
        validate: {
            validator: function(value) {
                return /^\d+$/.test(value);
            },
            message: 'El teléfono debe contener solo números'
        }
    },
    estado: {
        type: String,
        enum: ['true', 'false'],
        required: [true, 'El estado es requerido']
    },
    observacion: {
        type: String,
        required: [true, 'La observación es requerida']
    }
});


//este es el nombre del objeto Ambiente
module.exports = model('Empleado', EmpleadoSchema)//Exportar el modelo

