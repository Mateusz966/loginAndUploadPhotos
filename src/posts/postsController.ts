import * as express from 'express';
import post from './postInterface';
import postModel from './postsModel';
import controller from '../interfaces/controllerInterface';
import { NextFunction } from 'connect';
import authService from '../auth/authService';

class PostsController implements controller {
  public path = '/posts';
  public router = express.Router();
  private authService = new authService();

  constructor() {
    this.initializeRoutes();
  }
 
  public initializeRoutes() {
    this.router.get(this.path, this.authService.authMiddleware, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.authService.authMiddleware, this.getPost);
    this.router.post(this.path, this.authService.authMiddleware, this.createPost);
    this.router.delete(`${this.path}/:id`, this.authService.authMiddleware, this.deletePost);
  }
 
  private getAllPosts = (request: express.Request, response: express.Response) => {
    postModel.find()
      .then((posts) => {
        response.send(posts);
      })
      .catch((error) => {
        response.send(error);
      });
  }
  
  private getPost = (request: express.Request, response: express.Response, next: NextFunction) => {
    const id = request.params.id;
    postModel.findById(id)
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          next('Post not found')
        }
      })
      .catch((error) => {
        response.send(error);
      });
  }
 
  private createPost = (request: express.Request, response: express.Response) => {
    const postData: post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save()
      .then(savedPost => {
        response.send(savedPost);
      })
      .catch((error) => {
        response.send(error);
      })
  }

  private deletePost = (request: express.Request, response: express.Response, next: NextFunction) => {
    const id = request.params.id;
    postModel.findByIdAndDelete(id)
      .then((postToDelete) => {
        if (postToDelete) {
          response.sendStatus(204)
        } else {
          next('Post not found')
        }
      })
      .catch((error) => {
        response.send(error)
      });
  }
}

export default PostsController;