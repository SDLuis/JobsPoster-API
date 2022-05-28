"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRole = exports.isCategory = exports.isNumber = exports.notEmpty = exports.isString = void 0;
const Job_model_1 = require("../models/Job.model");
const User_model_1 = require("../models/User.model");
const isString = (string) => {
    return typeof string === 'string';
};
exports.isString = isString;
const notEmpty = (param) => {
    return param === '';
};
exports.notEmpty = notEmpty;
const isNumber = (number) => {
    return typeof number === 'number';
};
exports.isNumber = isNumber;
const isCategory = (param) => {
    return Object.values(Job_model_1.category).includes(param);
};
exports.isCategory = isCategory;
const isRole = (param) => {
    return Object.values(User_model_1.role).includes(param);
};
exports.isRole = isRole;
