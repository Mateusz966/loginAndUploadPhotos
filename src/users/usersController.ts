import controller from '../interfaces/controllerInterface';
import * as express from 'express';
import userModel from './usersModel';
import user from './userInterface';
import checkValuesIsEqual from '../middleware/checkValuesIsEqual';
import { NextFunction } from 'express';

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

  private getAllUsers = (request: express.Request, response: express.Response) => {
    userModel.find()
      .then((users) => {
        response.send(users);
      })
      .catch((error) => {
        response.send(error);
      })
  }
}

export default userController;
