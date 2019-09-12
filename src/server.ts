import App from './app';
import PostsController from './posts/postsController';
import UserController from './users/usersController';

const app = new App(
  [
  new PostsController(),
  new UserController(), 
  ],
  5000,
);

app.listen();
