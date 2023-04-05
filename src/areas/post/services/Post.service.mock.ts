import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { posts } from "../../../model/fakeDB";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    posts.push(post);
  }
  getAllPosts(username: string): IPost[] {
    return posts.filter((post) => post.userId === username);
  }
  findById(id: string): IPost {
    return posts.find((post) => post.id == id);
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  deletePost(id: string): void {
    const idx = posts.findIndex((post) => post.id == id);
    posts.splice(idx, 1);
  }

  //not now
  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
