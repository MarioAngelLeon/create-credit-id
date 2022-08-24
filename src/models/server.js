const express = require('express');
const cors = require('cors');

const DBConnection = require('../db/DBConnection');

class Server {
    
    constructor(){

        //Inicialización de la app
        this.app = express();

        //Variables de entorno
        const { PORT } = process.env;
        this.port =  PORT || 3000;

        //Middlewares para la aplicación
        this.middlewares();

        //Metodo que define las rutas
        this.routes();
    }

    

    middlewares(){

        //Middleware para parsear el body a json
        this.app.use(express.json());

        // Middleware para el cors
        this.app.use(cors());

    }


    routes(){

        this.app.use('/api/v1/udis/create', require('../routes/udis.router'));

    }

    //Metodo encargado de realizar la configuración y el levantamiento de la app
    run(){

        this.app.listen(this.port, ()=>{

            DBConnection.sync().then(res=>{
                console.log('******* DB ONLINE **********')
            }).catch(error=>{
                console.error('Error trying to start db ', error);
            });

            console.log(`Listening at port ${this.port}`);
        });

    }
}

module.exports = Server;