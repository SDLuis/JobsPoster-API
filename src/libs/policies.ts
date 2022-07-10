import { Request, Response, NextFunction } from "express";
import { CustomRequest, NotSensistiveInfoUser } from "../models/User.model";
import * as policiesService from "../services/policies.service";

export const Admin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any as CustomRequest).token as NotSensistiveInfoUser;
    const response = policiesService.onlyAdmin(user.role);
    if (response === true) {
      next();
    } else {
      res.status(400).send(response);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const posterAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any as CustomRequest).token as NotSensistiveInfoUser;
    const response = policiesService.accessToAdd(user.role);
    if (response === true) {
      next();
    } else {
      res.status(400).send(response);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const ownerAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fullUser = (req as any as CustomRequest)
      .token as NotSensistiveInfoUser;
    const fullJob = (req as any as CustomRequest).json as any;
    const userId = fullUser.User_ID;
    const userRole = fullUser.role;
    const job_userId = fullJob?.dataValues.User_ID;
    if (!fullJob) {
      throw new Error("Incorret Job ID");
    } else {
      const response = policiesService.ownerAccess(userId, job_userId, userRole);
      if (response === true) {
        next();
      } else {
        res.status(400).send(response);
      }
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
