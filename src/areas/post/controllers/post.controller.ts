import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
// import { post, posts } from "../../../model/fakeDB";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private _postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._postService = postService;
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
    const posts = this._postService.getAllPosts("jun");
    res.render("post/views/posts", { posts });
    //loop through posts in posts.ejs -> render them in ejs
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (request: Request, res: Response, next: NextFunction) => {
    const post = this._postService.findById(request.params.id)
    res.render("post/views/post", { post });
    
    /*
    1. search posts table with id
    2. return post data

    render pfp
    render username
    render created_at
    render msg
    render comments and reposts
    */
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    /*
    1. get comment id
    2. get user id
    3. get post id
    4. pfp
    5. user name
    6. msg

    render pfp
    render msg
    */
  };
  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    /*
    1. get post id
      1.1 comment#
      1.2 likes#
    2. get user id
    3. get id
    4. 
    5. 
    6. 

    render pfp
    render msg
    */
  };
  private deletePost = async (request: Request, res: Response, next: NextFunction) => {
    const post = this._postService.deletePost(request.params.id);
    res.redirect("/");
  };
}

export default PostController;
