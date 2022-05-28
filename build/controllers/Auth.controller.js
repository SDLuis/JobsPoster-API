"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const userValidation = __importStar(require("../validations/user.validation"));
const authValidation = __importStar(require("../validations/auth.validations"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const NewUserEntry = userValidation.toNewUser(req.body);
        const addedUser = yield authService.addUser(NewUserEntry);
        res.status(200).send(addedUser);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsToLogin = authValidation.toLogin(req.body);
        const response = yield authService.Login(paramsToLogin);
        if (typeof response == 'string') { //WORKINGG!!!!!!!
            const token = response;
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 0o1 * 60 * 60 * 1000
            });
            res.status(200).send('U RE LOGED');
        }
        else {
            return (response != undefined)
                ? res.status(400).send(response.message)
                : res.status(400).send('Something went wrong :((');
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.login = login;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['jwt'];
        if (!token) {
            res.status(400).send('unaunthenticated');
        }
        else {
            const response = yield authService.auth(token);
            req.token = response.dataValues;
            next();
        }
    }
    catch (e) {
        res.status(400).send('Something went wrong');
    }
});
exports.auth = auth;
