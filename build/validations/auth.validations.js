"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLogin = void 0;
const utils_1 = require("../utils/utils");
const parseEmail = (emailFromRequest) => {
    if (!(0, utils_1.isString)(emailFromRequest) || (0, utils_1.notEmpty)(emailFromRequest)) {
        throw new Error('Invalid Email');
    }
    return emailFromRequest;
};
const parsePassword = (passwordFromRequest) => {
    if ((0, utils_1.notEmpty)(passwordFromRequest)) {
        throw new Error('Invalid Password');
    }
    return passwordFromRequest;
};
const toLogin = (object) => {
    const login = {
        email: parseEmail(object.email),
        password: parsePassword(object.password)
    };
    return login;
};
exports.toLogin = toLogin;
