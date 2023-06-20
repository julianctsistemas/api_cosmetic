//Importar paquetes requeridos de node
const {response}= require('express')


//Importacion de los modelos 
const Producto=require('../models/producto')


//consultar
const productoGet = async(req, res = response)=>{
    const _id = req.query.id;
    if (_id != undefined ) {
        const productos = await Producto.findById(_id)
        res.json({
         productos
        });
        return;
    }

   const productos = await Producto.find()
   res.json({
    productos
   })
}



const productoPost = async (req, res ) => {
    try {
        // Capturar atributos o parámetros
        const body = req.body;
        // Instanciar el objeto
        const producto = new Producto(body);

        // Guardar objeto
        await producto.save();

        res.json({
            msg: 'La inserción se efectuó exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message
        });
    }
};

const productoPut = async (req, res = response) => {
  let id = null;
  if (req.query != null && req.query.id != null) {
    id = req.query.id;
  }
  const { categoria, nombre, stockMaximo, stockMinimo, precioCosto, precioVenta, observacion, estado } = req.body;
  let mensaje = "";

  try {
    if (id != null) {
      const update = {
        categoria: categoria,
        nombre: nombre,
        stockMaximo: stockMaximo,
        stockMinimo: stockMinimo,
        precioCosto: precioCosto,
        precioVenta: precioVenta,
        observacion: observacion,
        estado: estado
      };

      if (!isNaN(precioCosto) && !isNaN(precioVenta)) {
        // Calcula la ganancia si los valores de precioCosto y precioVenta son números
        const ganancia = (precioVenta - precioCosto) || 0;
        update.ganancia = ganancia;
      }

      const producto = await Producto.findByIdAndUpdate(
        id,
        update,
        { new: true, runValidators: true }
      );

      if (producto) {
        mensaje = "La modificación se efectuó correctamente";
      } else {
        mensaje = "El producto no fue encontrado";
      }
    } else {
      mensaje = "Ingrese un id";
    }

  } catch (error) {
    console.error(error);
    mensaje = error.message;
  }

  res.json({
    msg: mensaje,
  });
};

  


const productoDelete = async (req, res = response) => {
    const { id } = req.query;
    let mensaje = "";
  
    try {
      const producto = await Producto.deleteOne({_id:id});
  
      if (producto) {
        mensaje = "La eliminación se efectuó correctamente";
      } else {
        mensaje = "El producto no fue encontrado";
      }
    } catch (error) {
      console.error(error);
      mensaje = "Se presentó un error en la eliminación";
    }
  
    res.json({
      msg: mensaje,
    });
  };



module.exports={
    productoGet,
    productoPost,
    productoPut,
    productoDelete
}
