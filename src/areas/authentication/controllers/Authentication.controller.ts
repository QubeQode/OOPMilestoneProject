import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import { forwardAuthenticated, ensureAuthenticated } from "../../../middleware/authentication.middleware";
import passport from "passport";


class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, forwardAuthenticated ,this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    res.render("authentication/views/login");
  };

  private showRegistrationPage = (req: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = (req: express.Request, res: express.Response) => {
    passport.authenticate("local", {

    }); 
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {};
  private logout = async (req: express.Request, res: express.Response) => {
    // req.logout((err) => {});
  };
}

export default AuthenticationController;
