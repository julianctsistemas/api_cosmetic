const express = require ('express')
const{dbConnection}= require('../database/config.js')
const cors = require('cors'); //Implementar seguridad
const bodyParser = require('body-parser') //Recibir datos de formularios de html


class Server {
    

    constructor(){
        this.app = express()
        this.port = process.env.PORT//capturando variables
        this.productoPath = '/api/producto'//ruta publica
        this.empleadoPath = '/api/empleado'//ruta publica
        this.categoriaProductoPath = '/api/categoriaProducto'//ruta publica
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use(cors())
        this.middlewares()//ayudas extras enlaces o puentes
        this.routes()//las rutas
        this.conectarDB()//conectarse a la base de datos
    }

    listen(){
        this.app.listen(this.port,() => {
            console.log(`Escuchando el puerto ${this.port}`)
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(bodyParser.urlencoded({ extended: true }))
        
        this.app.use(bodyParser.json())
    }

    routes(){
        this.app.use(this.productoPath, require('../routes/productos'))
        this.app.use(this.empleadoPath, require('../routes/empleados.js'))
        this.app.use(this.categoriaProductoPath, require('../routes/categoriaProductos.js'))
    }

    
    //asincronica porque no se sabe cuanto tiempo hay que esperar siempre hya que retornar con await

    async conectarDB(){
       await dbConnection() //esprando la conexion o respuesta del servidor
    }
}

module.exports = Server
