//Importar paquetes requeridos de node
const {response}= require('express')


//Importacion de los modelos 
const CategoriaProducto=require('../models/categoriaProducto')

const categoriaProductoGet = async(req, res = response)=>{
   

   const categoriaProductos = await CategoriaProducto.find()
   res.json({
    categoriaProductos
   })
}
  
module.exports={
    categoriaProductoGet,
    
}