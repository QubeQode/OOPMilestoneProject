import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import { forwardAuthenticated, ensureAuthenticated } from "../../../middleware/authentication.middleware";
import passport from "passport";

declare module "express-session" {
  interface SessionData {
    messages: { [key: string]: any };
  }
}

declare global {
  namespace Express {
    interface Request {
      logout(done: (err: any) => void): void;
    }
  }
}

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, ensureAuthenticated, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, forwardAuthenticated, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    const message = req.session.messages ? req.session.messages[0] : " ";
    req.session.messages = [];
    res.render("authentication/views/login", { message });
  };

  private showRegistrationPage = (req: express.Request, res: express.Response) => {
    const message = req.session.messages ? req.session.messages[0] : " ";
    req.session.messages = [];
    res.render("authentication/views/register", { message });
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: `${this.path}/login`,
    failureMessage: true,
  });

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate("local", {
      successRedirect: "/posts",
      failureRedirect: `${this.path}/register`,
      failureMessage: true,
    });
  };

  private logout = async (req: express.Request, res: express.Response) => {
    req.logout((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect(`/${this.path}/login`);
  };
}

export default AuthenticationController;
