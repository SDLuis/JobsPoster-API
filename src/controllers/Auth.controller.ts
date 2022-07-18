import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import * as userValidation from "../validations/user.validation";
import * as authValidation from "../validations/auth.validations";
import { CustomRequest } from "../models/User.model";

export const register = async (req: Request, res: Response) => {
  try {
    const NewUserEntry = userValidation.toNewUser(req.body);
    const response = await authService.addUser(NewUserEntry);
    res.status(200).send(response);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const paramsToLogin = authValidation.toLogin(req.body);
    const response = await authService.Login(paramsToLogin);
    if (typeof response == "string") {
      //WORKINGG!!!!!!!
      const token = response;
      res.cookie("jwt2", token, {
        maxAge: 0o1 * 60 * 60 * 1000,
        //domain: 'jobsposter.herokuapp.com',
        secure: true,
        sameSite: 'none'
      });
      res.status(200).send({"loggedMessage":'U RE LOGED', "data": token});
    } else {
      return response != undefined
        ? res.send(response)
        : res.status(400).send("Something went wrong :((");
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    console.log(req.cookies.jwt)

    if (!token) {
      res.status(400).send("unaunthenticated");
    } else {
      const response = (await authService.auth(token)) as any;
      (req as any as CustomRequest).token = response.dataValues;
      next();
    }
  } catch (e: any) {
    res.status(400).send("Something went wrong");
  }
};
