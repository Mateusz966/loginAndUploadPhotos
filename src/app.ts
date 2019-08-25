import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import 'dotenv/config';
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers, port) {
    this.app = express();
    this.port = port;
 
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      console.log(controller.router);
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private connectToDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    console.log(MONGO_USER, MONGO_PASSWORD, MONGO_PATH);
    
    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {useNewUrlParser: true});
  }
}
 
export default App;