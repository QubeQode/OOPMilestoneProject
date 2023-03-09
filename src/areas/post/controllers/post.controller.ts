import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post, posts } from "../../../model/fakeDB";

class PostController implements IController {
  public path = "/posts";
  public router = Router();

  constructor(postService: IPostService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (_: Request, res: Response) => {
    /*
    1. find current user via session
    2. find current user via followers
    3. randomly select posts from followers
    4. select latest posts from current user
    5. sort posts by created_at value

    render pfp
    render created_at value
    render username
    render msg
    render comment# and repost#
    */
    res.render("post/views/posts", { posts });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (request: Request, res: Response, next: NextFunction) => {
    /*
    1. search posts table with id
    2. return post data

    render pfp
    render username
    render created_at
    render msg
    render comments and reposts
    */
    res.render("post/views/post", { post });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    
  };
  private createPost = async (req: Request, res: Response, next: NextFunction) => {

  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {

  };
}

export default PostController;
