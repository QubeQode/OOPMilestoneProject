import IComment from "./comment.interface";

interface IPost {
  userId: number;
  postId: number;
  message: string;
  likes: number;
  comments: IComment[];
  createdAt: number;
}

export default IPost;
