//Importar paquetes requeridos de node
const {response}= require('express')


//Importacion de los modelos 
const Empleado=require('../models/empleado')


//consultar
const empleadoGet = async(req, res = response)=>{
    const _id = req.query.id;
    if (_id != undefined ) {
        const empleados = await Empleado.findById(_id)
        res.json({
         empleados
        });
        return;
    }

   const empleados = await Empleado.find()
   res.json({
    empleados
   })
}



const empleadoPost = async (req, res ) => {
    try {
        // Capturar atributos o parámetros
        const body = req.body;
        // Instanciar el objeto
        const empleado = new Empleado(body);

        // Guardar objeto
        await empleado.save();

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

const empleadoPut = async (req, res = response) => {
    let id = null;
    if (req.query != null && req.query.id != null) {
        id = req.query.id;
    } 
    const { cedula, nombre, correo, direccion, telefono, estado, observacion} = req.body;
    let mensaje = "";
  
    try {
        if (id != null) {

            const update = { cedula: cedula , nombre: nombre, correo: correo, direccion: direccion, telefono: telefono, estado: estado, observacion: observacion};

           const empleado = await Empleado.findByIdAndUpdate(
                id,
                update,
                {new: true, runValidators: true}
              );

              if (empleado) {
                mensaje = "La modificación se efectuó correctamente";
              } else {
                mensaje = "El empleado no fue encontrado";
              }
        }
        else {
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
  
  const empleadoDelete = async (req, res = response) => {
    const { id } = req.query;
    let mensaje = "";
  
    try {
      const empleado = await Empleado.deleteOne({_id:id});
  
      if (empleado) {
        mensaje = "La eliminación se efectuó correctamente";
      } else {
        mensaje = "El empleado no fue encontrado";
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
    empleadoGet,
    empleadoPost,
    empleadoPut,
    empleadoDelete
}
