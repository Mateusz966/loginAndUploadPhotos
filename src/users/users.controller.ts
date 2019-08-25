import controller from '../interfaces/controller.interface';
import * as express from 'express';
import userModel from './users.model';

class userController implements controller {
  public path = '/users';
  public router = express.Router();

  constructor() {
    this.initializeRoute();
  }

  /**
   * initializeRoute
   */
  public initializeRoute() {
    this.router.get(this.path, this.getAllUsers);
  }

  getAllUsers = (request: express.Request, response: express.Response) => {
    
  }
}

export default userController;
