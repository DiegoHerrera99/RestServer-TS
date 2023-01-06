import express, { Application } from 'express';
import cors from 'cors';

import db from '../db/connection';
import userRoutes from '../routes/usuario';

class Server{

    private app: Application;
    private port: string;
    private paths = {
        usuarios: '/api/usuarios',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    //TODO: Conectar base de datos
    async dbConnection() {
        try{
            await db.authenticate();
            console.log('Database online');

        } catch (err: any) {
            throw new Error(err);
        }
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Lectura del body
        this.app.use( express.json() );

        //Carpeta pública
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.paths.usuarios, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port + '!!!');
        })
    }
    
}

export default Server;