import controller from '../interfaces/controller.interface';
import * as express from 'express';
import userModel from './users.model';
import user from './user.interface';

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

  private createUser = (request: express.Request, response: express.Response) => {
    const userData: user = request.body;
    const createdUser = new userModel(userData);
    createdUser.save()
      .then((user) => {
        response.send(user);
      })
      .catch((error) => {
        response.send(error);
      })
  }
}

export default userController;
