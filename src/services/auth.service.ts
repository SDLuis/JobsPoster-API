import "../models/db.model";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {
  userModel,
  userEntry,
  NewUserEntry,
  IDecoded,
  NotSensistiveInfoUser,
} from "../models/User.model";
import authConfig from "../config/authConfig";

export const getUser = (Users: userEntry[]): userEntry[] => {
  return Users;
};

export const addUser = async (
  newUserEntry: NewUserEntry
): Promise<NewUserEntry | Error> => {
  try {
    const newUser = {
      First_Name: newUserEntry.First_Name,
      Last_Name: newUserEntry.Last_Name,
      role: "poster",
      email: newUserEntry.email,
      password: await bcrypt.hash(
        newUserEntry.password.toString(),
        +authConfig.rounds
      ),
    };
    const user = await userModel.findOne({ where: { email: newUser.email } });
    if (user) {
      const Error: Error = {
        name: "Email always exist",
        message: "This email is not available",
      };
      return Error;
    } else {
      userModel.create(newUser);
      return newUser;
    }
  } catch (e: any) {
    return e.message;
  }
};

export const Login = async (
  authParams: any
): Promise<string | Error | undefined> => {
  try {
    const user = await userModel.findOne({
      where: { email: authParams.email },
    });
    if (user) {
      const valid_password = await bcrypt.compare(
        authParams.password.toString(),
        user.password
      );
      if (valid_password) {
        const token = jsonwebtoken.sign(
          { id: user.User_ID },
          authConfig.secret,
          {
            expiresIn: "9h",
          }
        );
        return token;
      } else {
        const Error: Error = {
          name: "Error password",
          message: "Invalid or wrong password",
        };
        return Error;
      }
    } else {
      const Error: Error = {
        name: "Error user",
        message: "Invalid or wrong user",
      };
      return Error;
    }
  } catch (e: any) {
    return e.message;
  }
};

export const auth = async (
  token: string
): Promise<NotSensistiveInfoUser | string | undefined> => {
  try {
    const decoded = (await jsonwebtoken.verify(
      token,
      authConfig.secret
    )) as IDecoded;
    if (!decoded) {
      return "unauthenticated";
    } else {
      const user = (await userModel.findOne({
        where: { User_ID: decoded.id },
        attributes: { exclude: ["password"] },
      })) as NotSensistiveInfoUser;
      return user;
    }
  } catch (e: any) {
    return e.message;
  }
};
