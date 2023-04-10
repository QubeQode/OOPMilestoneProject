//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IAuthenticationService } from "../services/IAuthentication.service";
import { passportStrategy } from "/../interfaces/passport.interface";
import bcrypt from "bcrypt";

export interface PassportStrategy {
  name: "local";
  strategy: LocalStrategy;
}

export default class PassportConfig {
  private _authenticationService: IAuthenticationService;

  constructor(strategies: PassportStrategy[], authenticationService: IAuthenticationService) {
    this.addStrategies(strategies);
    this._authenticationService = authenticationService;

    this.localStrategy();
    this.serializeUser();
    this.deserializeUser();
  }

  private addStrategies(strategies: PassportStrategy[]): void {
    strategies.forEach((passportStrategy: PassportStrategy) => {
      passport.use(passportStrategy.name, passportStrategy.strategy);
    });
  }

  private localStrategy(): void {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email, password, done) => {
          const user = await this._authenticationService.getUserByEmailAndPassword(email, password);
          

          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          if (await bcrypt.compare(password, user.password)) {
            console.log("MOANNNN", user);
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        }
      )
    );
  }

  private serializeUser(): void {
    passport.serializeUser((user: any, done: (err: any, id: number) => void) => {
      console.log(user);
      done(null, user.id);
    });
  }


  private deserializeUser = () => {
    passport.deserializeUser((id: number, done: (error: any, user: Express.User | false | null) => void) => {
      let user = this._authenticationService.getUserById(id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }
}
