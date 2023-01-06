import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME || '', 
    process.env.DB_USER_NAME || '', 
    process.env.DB_PWD || '', 
    {
        host: process.env.DB_HOST || '',
        dialect: 'mysql',
        logging: false,
    }
);

export default db;