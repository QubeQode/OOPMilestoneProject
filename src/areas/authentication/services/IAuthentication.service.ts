// import IPost from "./post.interface";
import IUser from "../../../interfaces/user.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export interface IAuthenticationService {
  _db: any;
  findUserByEmail(email: String): Promise<IUser>;

  getUserById(id: number): Promise<null | IUser>;

  createUser(user: IUser): Promise<IUser>;

  getUserByEmailAndPassword(email: string, password: string): Promise<IUser>;

  // isUserValid(user: any, password: string): Promise<boolean>
}
