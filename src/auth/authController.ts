import * as bcrypt from 'bcrypt';
import * as express from 'express';
import controller from '../interfaces/controllerInterface';
import user from '../users/userInterface';
import userModel from '../users/usersModel';
import login from './loginInterface';
import checkValuesIsEqual from '../middleware/checkValuesIsEqual';
import { NextFunction } from 'express';
import authService from './authService';

class authController implements controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;
  private authService = new authService();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(`${this.path}/registerUser`, this.userRegistration);
    this.router.post(`${this.path}/userLogin`,this.authService.authMiddleware ,this.userLogin);
  }

  private userRegistration = (request: express.Request, response: express.Response, next: NextFunction) => {
    const userData: user = request.body;
    const isUserPasswordsValid = checkValuesIsEqual(userData.password, userData.repeatPassword);
    if (isUserPasswordsValid) {
      const hashedPassword = bcrypt.hash(userData.password, 2);
      hashedPassword.then((password) => {
        userData.password = password;
        const createdUser = new userModel(userData);
        createdUser.save()
        .then((user) => {
          user.password = undefined;
          response.send(user);
        })
        .catch((error) => {
          response.send(error);
        })
      });
    } else {
      next('repeat password field is not valid');
    }
  }

  private userLogin = (request: express.Request, response: express.Response, next: NextFunction) => {
    const loginData: login = request.body;
    this.user.findOne({email: loginData.email}, (err, user) => {
      if (user) {
        bcrypt.compare(loginData.password, user.password)
          .then((isCompare) => {
            if (isCompare) {
              user.password = undefined;
              const tokenData = this.authService.createToken(user);
              response.setHeader('Set-Cookie', [`token=${tokenData.token}`]); 
              response.send(user)
            } else {
              next('wrong password or e-mail');
            }
          });
      } else {
        next('wrong password or e-mail');
      }
    });
  }
}

export default authController;