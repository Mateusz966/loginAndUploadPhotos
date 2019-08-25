import App from './app';
import PostsController from './posts/posts.controller';
import UserController from './users/users.controller';

const app = new App(
  [
  new PostsController(),
  new UserController(),
  ],
  5000,
);

app.listen();
