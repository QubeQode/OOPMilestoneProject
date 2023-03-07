import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user = await this.findUserByEmail(email);
    if (user) {
      if (user.password === password) {
        return user;
      }
    }
    throw new Error("Password does not exist");
  }

  public async findUserByEmail(email: String): Promise<null | IUser> {
    let user = this._db.users.find((user) => user.email === email); 
    if (user) {
      return user;
    }
    throw new Error("User with that email does not exist");
  }


  public async createUser(user: any): Promise<IUser> {

    throw new Error("Method not implemented");
  }
}
