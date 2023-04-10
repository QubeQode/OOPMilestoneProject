interface IComment {
  id: number;
  message: string;
  userId: number;
  postId: number;
  createdAt: string;
}

export default IComment;
