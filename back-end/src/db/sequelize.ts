import { Sequelize } from "sequelize-typescript";
import {config} from 'dotenv';
import Fatura from "./models/faturaModel";

if (process.env.NODE_ENV === 'test') {
    config({ path: '.env.test' })
  } else {
    config()
  }
  
export default class SequelizeSetup {

    public sequelize : Sequelize;

    constructor(){
        this.sequelize = this.connect();
    }

    private connect(): Sequelize{ 
        const sequelize = new Sequelize ({
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            dialect: "postgres",
            /* dialectOptions:{
                ssl: process.env.DB_SSL
            }, */
            //logging: true,
            models: [Fatura]
        })

        sequelize.authenticate().then( () => console.log('Database SQL connect')).catch(err => console.error(`Database SQL Error:: ${err}`));
        sequelize.sync().then(() => console.log("synchronization completed")).catch(err => console.log(`synchronization error:: ${err}`)) ;
        return sequelize
    }

    public connect_test(): Sequelize{
        const sequelize = new Sequelize ({
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            dialect: "postgres",
            //logging: true,
            models: [Fatura]
        })
        console.log('sequelize connect test')
        sequelize.authenticate().then( () => console.log('Database SQL connect')).catch(err => console.error(`Database SQL Error:: ${err}`));
        sequelize.sync().then(() => console.log("synchronization completed")).catch(err => console.log(`synchronization error:: ${err}`))
        return sequelize
    }

    public async close_test(): Promise<void>{
        await this.sequelize.close()
    }

}