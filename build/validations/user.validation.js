"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewUser = void 0;
const utils_1 = require("../utils/utils");
const parseFirstName = (firstNameFromRequest) => {
    if (!(0, utils_1.isString)(firstNameFromRequest) || (0, utils_1.notEmpty)(firstNameFromRequest)) {
        throw new Error('Invalid First Name');
    }
    return firstNameFromRequest;
};
const parseLastName = (LastNameFromRequest) => {
    if (!(0, utils_1.isString)(LastNameFromRequest) || (0, utils_1.notEmpty)(LastNameFromRequest)) {
        throw new Error('Invalid Last Name');
    }
    return LastNameFromRequest;
};
const parseRole = (roleFromRequest) => {
    if (!(0, utils_1.isString)(roleFromRequest) || !(0, utils_1.isRole)(roleFromRequest) || (0, utils_1.notEmpty)(roleFromRequest)) {
        throw new Error('Invalid Role');
    }
    return roleFromRequest;
};
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
const toNewUser = (object) => {
    const newUser = {
        First_Name: parseFirstName(object.First_Name),
        Last_Name: parseLastName(object.Last_Name),
        role: parseRole(object.role),
        email: parseEmail(object.email),
        password: parsePassword(object.password)
    };
    return newUser;
};
exports.toNewUser = toNewUser;
