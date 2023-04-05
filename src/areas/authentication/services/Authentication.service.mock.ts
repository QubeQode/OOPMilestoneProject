import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import bcrypt from "bcrypt"; 

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;
  saltRounds = 10;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user = await this.findUserByEmail(email);
    if (user) {
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          throw new Error("Error comparing passwords");
        }
        if ( result === true ) {
          return user;
        } 
      });
      return null;
    }
  }

  public async findUserByEmail(email: String): Promise<null | IUser> {
    let user = this._db.users.find((user) => user.email === email); 
    if (user) {
      return user;
    }
    throw new Error("User with that email does not exist");
  }

  

  public async getUserById (id: number): Promise<null | IUser> {
    let user = this._db.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error("User with that id does not exist");
  }

  // public async isUserValid(user: any, password: string): Promise<boolean> {}


  public async createUser(user: any): Promise<IUser> {

    const hashedPassword = bcrypt.hash(user.password, this.saltRounds, function(err, hash) {
      // Store hash in your password DB.
      if (err) {
        throw new Error("Error hashing password");
      }
    
      const newUser = {
        email: user.email,
        password: hash
      };
      this._db.users.push(newUser);
      return newUser;

  });
    throw new Error("Method not implemented");
  }
}




