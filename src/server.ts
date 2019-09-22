import App from './app';
import postsController from './posts/postsController';
import userController from './users/usersController';
import authController from './auth/authController';

const app = new App(
  [
  new postsController(),
  new userController(), 
  new authController(),
  ],
  5000,
);

app.listen();
