//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IAuthenticationService } from "../services/IAuthentication.service";
import { passportStrategy } from "/../interfaces/passport.interface";


export interface PassportStrategy {
  name: 'local';
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
        (email, password, done) => {
          this._authenticationService
            .getUserByEmailAndPassword(email, password)
            .then((user) => {
              if (!user) {
                return done(null, false, { message: "Incorrect email." });
              }
              if (user.password !== password) {
                return done(null, false, { message: "Incorrect password." });
              }
              return done(null, user);
            })
            .catch((err) => done(err));
        }
      )
    );
  }

  private serializeUser(): void {
    passport.serializeUser((user: any, done: (err: any, id: number) => void) => {
      done(null, user.id);
    });
  }

  private deserializeUser(): void {
    passport.deserializeUser(function (id: number, done: (error: any, user: Express.User | false | null) => void) {
      let user = this._authenticationService.getUserById(id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }
}
