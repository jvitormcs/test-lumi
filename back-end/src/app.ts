import express, {Router} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import SequelizeSetup from './db/sequelize';
import mainRoutes from './routes/routes'
import { config } from 'dotenv';
config();



class App {

  public app: express.Application;
  private router: Router;
  private initializationDatabaseConnections(): void{

    new SequelizeSetup()

}


constructor(){
    this.app = express();
    this.router = Router();

    this.initializationDatabaseConnections()

    this.initializationMiddlewares()

    this.initializationRoutes()

    
  }
  private initializationMiddlewares(){
      const {app} = this

      console.log('initialize middleware')

      app.use(express.json())
      app.use(express.urlencoded({extended: true}))
      app.use(helmet())
      app.use(cors({
          origin: '*'
        
      }))
      app.use('/uploads',express.static('uploads'))


  }

  private initializationRoutes(){
      const {app} = this
      app.use(mainRoutes)
  }

}


export default App;