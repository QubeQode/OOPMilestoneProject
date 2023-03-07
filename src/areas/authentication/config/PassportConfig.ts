//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)
import passport from 'passport';
import { passportStrategy} from '/../interfaces/passport.interface';
import { Strategy as LocalStrategy } from 'passport-local';
import { IAuthenticationService } from '../services/IAuthentication.service'



export default class PassportConfig {
    authenticationService: any;

    constructor(strategies: passportStrategy[], authenticationService: IAuthenticationService) {
        this.addStrategies(strategies);
    }



    private addStrategies(strategies: passportStrategy[]): void {
        strategies.forEach((passportStrategy: passportStrategy) => {
            passport.use(passportStrategy.name, passportStrategy.strategy)
        })
    }

    private localStrategy (): void {
        passport.use(new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            (email, password, done) => {
                this.authenticationService.getUserByEmailAndPassword(email, password)
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email.' });
                    }
                    if (user.password !== password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                })
                .catch((err) => done(err));
            }
        ));
    }

    private serializeUser(): void {
        passport.serializeUser((user: any, 
            done: (err: any, id: number) => void) => {
            done(null, user.id);
        })
    }

    private deserializeUser(): void {
         passport.deserializeUser(function (id: number,
             done: (error: any, user: Express.User | false | null) => void) {
                let user = getUserById(id);
                if (user) {
                    done (null, user)
                } else {
                    done({ message: 'User not found'}, null)
                }

         });
    }
}