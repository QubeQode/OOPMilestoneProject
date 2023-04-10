import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { database } from "../../../model/fakeDB";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    database.posts.push(post);
  }
  getAllPosts(username: string): IPost[] {
    const userId = database.users.find(user => user.username === username).id
    return database.posts.filter((post) => post.userId === userId);
  }
  findById(id: string): IPost {
    return database.posts.find((post) => post.postId == Number(id));
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  deletePost(id: string): void {
    const idx = database.posts.findIndex((post) => post.postId == Number(id));
    database.posts.splice(idx, 1);
  }

  //not now
  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
