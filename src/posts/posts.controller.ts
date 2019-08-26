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
 
  private getAllPosts = (request: express.Request, response: express.Response) => {
    postModel.find()
      .then((posts) => {
        response.send(posts);
      })
      .catch((error) => {
        response.send(error);
      });
  }
  
  private getPost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    postModel.findById(id)
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          response.status(404).send({
            error: 'post not found',
          });
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

  private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    postModel.findByIdAndDelete(id)
      .then((postToDelete) => {
        if (postToDelete) {
          response.sendStatus(204)
        } else {
          response.sendStatus(404)
        }
      })
      .catch((error) => {
        response.send(error)
      });
  }
}

export default PostsController;