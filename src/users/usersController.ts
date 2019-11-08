import controller from '../interfaces/controllerInterface';
import * as express from 'express';
import userModel from './usersModel';
import user from './userInterface';
import { NextFunction } from 'express';
import authService from '../auth/authService';

class userController implements controller {
  public path = '/users';
  public router = express.Router();
  private authService = new authService();

  constructor() {
    this.initializeRoute();
  }

  /**
   * initializeRoute
   */
  public initializeRoute() {
    this.router.get(this.path, this.authService.authMiddleware, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.authService.authMiddleware, this.getUser)
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
