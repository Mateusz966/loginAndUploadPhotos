import * as bcrypt from 'bcrypt';
import * as express from 'express';
import controller from '../interfaces/controllerInterface';
import user from '../users/userInterface';
import userModel from '../users/usersModel';
import checkValuesIsEqual from '../middleware/checkValuesIsEqual';
import { NextFunction } from 'express';

class authController implements controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(`${this.path}/registerUser`, this.userRegistration);
    this.router.post(`${this.path}/userLogin`, this.userLogin);
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
    const loginData = request.body;
    console.log(loginData.email);
    this.user.findOne({email: loginData.email}, (error, response) => {
      if (response) {
        
      }
    });
  }
}

export default authController;