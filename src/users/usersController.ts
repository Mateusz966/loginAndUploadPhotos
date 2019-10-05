import controller from '../interfaces/controllerInterface';
import * as express from 'express';
import userModel from './usersModel';
import user from './userInterface';
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
    this.router.get(`${this.path}/:id`, this.getUser)
  }

  private getAllUsers = (request: express.Request, response: express.Response) => {
    userModel.find()
      .then((users) => {
        console.log(users);
        response.send(users);
      })
      .catch((error) => {
        response.send(error);
      })
  }

  private getUser = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    console.log(id);
    userModel.findById(id)
      .then((user) => {
        if (user) {
          response.send(user);
        } else {
          response.sendStatus(404);
        }
      })
  }
}

export default userController;
