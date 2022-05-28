"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.Login = exports.addUser = exports.getUser = void 0;
require("../models/db.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../models/User.model");
const authConfig_1 = __importDefault(require("../config/authConfig"));
const getUser = (Users) => {
    return Users;
};
exports.getUser = getUser;
const addUser = (newUserEntry) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        First_Name: newUserEntry.First_Name,
        Last_Name: newUserEntry.Last_Name,
        role: newUserEntry.role,
        email: newUserEntry.email,
        password: yield bcrypt_1.default.hash(newUserEntry.password.toString(), +authConfig_1.default.rounds)
    };
    User_model_1.userModel.create(newUser);
    return newUser;
});
exports.addUser = addUser;
const Login = (authParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.userModel.findOne({ where: { 'email': authParams.email } });
        if (user) {
            const valid_password = yield bcrypt_1.default.compare(authParams.password.toString(), user.password);
            if (valid_password) {
                const token = jsonwebtoken_1.default.sign({ id: user.User_ID }, authConfig_1.default.secret, {
                    expiresIn: '9h'
                });
                return token;
            }
            else {
                const Error = {
                    name: 'Error password',
                    message: ('Invalid or wrong password')
                };
                return Error;
            }
        }
        else {
            const Error = {
                name: 'Error user',
                message: ('Invalid or wrong user')
            };
            return Error;
        }
    }
    catch (e) {
        return e.message;
    }
});
exports.Login = Login;
const auth = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield jsonwebtoken_1.default.verify(token, authConfig_1.default.secret);
        if (!decoded) {
            return 'unauthenticated';
        }
        else {
            const user = yield User_model_1.userModel.findOne({ where: { User_ID: decoded.id }, attributes: { exclude: ['password'] } });
            return user;
        }
    }
    catch (e) {
        return e.message;
    }
});
exports.auth = auth;
