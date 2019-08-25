import * as express from 'express';
import post from './post.interface';
import postModel from './posts.model';
import controller from '../interfaces/controller.interface';

class PostsController implements controller {
  public path = '/posts';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPost);
    this.router.post(this.path, this.createPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }
 
  getAllPosts = (request: express.Request, response: express.Response) => {
    console.log(request.query);
    postModel.find()
      .then((posts) => {
        response.send(posts);
      })
  }
  
  getPost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    console.log(id);
    postModel.findById(id)
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          response.sendStatus(404);
        }
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

  deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    console.log(id);
    postModel.findByIdAndDelete(id)
      .then((postToDelete) => {
        if (postToDelete) {
          response.sendStatus(204)
        } else {
          response.sendStatus(404)
        }
      })
  }
}

export default PostsController;