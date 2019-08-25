import * as express from 'express';
import post from './post.interface';
import postModel from './posts.model';
import controller from '../interfaces/controller.interface';

class PostsController implements controller {
  public path = '/posts';
  public router = express.Router();
  private posts: post[];

  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createPost);
  }
 
  getAllPosts = (request: express.Request, response: express.Response) => {
    postModel.find()
      .then((posts) => {
        response.send(posts);
      })
  }
 
  createPost = (request: express.Request, response: express.Response) => {
    const postData: post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save()
      .then(savedPost => {
        response.send(savedPost);
      })
  }
}

export default PostsController;