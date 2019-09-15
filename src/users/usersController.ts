import controller from '../interfaces/controllerInterface';
import * as express from 'express';
import userModel from './usersModel';
import user from './userInterface';
import checkValuesIsEqual from '../middleware/checkValuesIsEqual';
import { NextFunction } from 'connect';

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
    this.router.post(this.path, this.createUser);
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

  private createUser = (request: express.Request, response: express.Response, next: NextFunction) => {
    const userData: user = request.body;
    const isUserPasswordsValid = checkValuesIsEqual(userData.password, userData.repeatPassword)
    const createdUser = new userModel(userData);
    if (isUserPasswordsValid) {
      createdUser.save()
      .then((user) => {
        response.send(user);
      })
      .catch((error) => {
        response.send(error);
      })
    } else {
      next('repeat password field is not valid');
    }
  }
}

export default userController;
