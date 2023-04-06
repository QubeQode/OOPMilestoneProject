import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { PrismaClient } from "@prisma/client";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  //  import the real database from the "db" folder
  //  and assign it to _db here
  public _db: PrismaClient;
  constructor() {
    this._db = new PrismaClient();
  }
  async findUserByEmail(email: string): Promise<IUser> {
    // 🚀 Talk to your real database here
    const user = await this._db.user.findUnique({
      where: {
        email: email
      }
    });
    throw new Error("Method not implemented.");
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    // 🚀 Talk to your real database here
    const user = await this._db.user.findUnique({
      where: {
        email: email,
        
      }
    });
    throw new Error("Method not implemented.");

  }
  async createUser(user: IUser): Promise<IUser> {
    // 🚀 Talk to your real database here

    throw new Error("Method not implemented.");
  }
}
