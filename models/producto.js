//Migracion 
const {Schema, model}=require('mongoose')


const ProductoSchema = Schema({
    //se define tipos de datos
    categoria: {
        type: String,
        required: [true, 'La categoria es requerida']
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
    
    cantidad: {
        type: Number,
        min: [1, 'El valor minimo de la cantidad es 1'],
        required: [true, 'La cantidad es requerido'],
        validate: {
            validator: function(value) {
                return /^\d+$/.test(value);
            },
            message: 'La cantidad  debe contener solo números'
        }
    },
    stockMaximo: {
        type: Number,
        max: [30, 'El valor maximo del stock es de 30'],       
        required: [true, 'El stock maximo es requerido'],
        validate: {
            validator: function(value) {
                return /^\d+$/.test(value);
            },
            message: 'El stock Maximo  debe contener solo números'
        }
    },
    stockMinimo: {
        type: Number,
        min: [1, 'El valor minimo del stock es de 1'],
        required: [true, 'El stock minimo es requerido'],
        validate: {
            validator: function(value) {
                return /^\d+$/.test(value);
            },
            message: 'El stock Minimo  debe contener solo números'
        }
    },
    precioCosto: {
        type: Number,
        required: [true, 'El precio costo es requerido'],
        validate: {
            validator: function(value) {
                return /^\d+$/.test(value);
            },
            message: 'El precio costo  debe contener solo números'
        }
    },
    precioVenta: {
        type: Number,
        required: [true, 'El precio venta es requerido'],
        validate: {
            validator: function(value) {
                return /^\d+$/.test(value);
            },
            message: 'El precio venta  debe contener solo números'
        }
    },
    ganancia: {
        type: Number,
        
    },
    observacion: {
        type: String,
        required: [true, 'La cobservacion es requerida']
    },
    estado: {
        type: String,
        enum: ['true', 'false'],
        required: [true, 'El estado es requerido']
    },

    })

    ProductoSchema.pre('save', function(next) {
        const precioCosto = this.precioCosto;
        const precioVenta = this.precioVenta;
      
        if (precioCosto && precioVenta) {
          const ganancia = precioVenta - precioCosto;
          this.ganancia = ganancia;
        }
      
        next();
      });
//este es el nombre del objeto Ambiente
module.exports = model('Producto', ProductoSchema)//Exportar el modelo

