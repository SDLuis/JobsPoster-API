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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findUser = exports.editUser = exports.getUsersWithoutSensitiveInfo = exports.getUsers = void 0;
require("../models/db.model");
const User_model_1 = require("../models/User.model");
const getUsers = (Users) => {
    return Users;
};
exports.getUsers = getUsers;
const getUsersWithoutSensitiveInfo = (Jobs) => {
    return Jobs.map(({ User_ID, First_Name, Last_Name, role, email }) => {
        return {
            User_ID, First_Name, Last_Name, role, email
        };
    });
};
exports.getUsersWithoutSensitiveInfo = getUsersWithoutSensitiveInfo;
const editUser = (id, newUserEntry) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.userModel.update(newUserEntry, { where: { 'User_ID': id } }).then(result => {
        return result;
    });
    return +result;
});
exports.editUser = editUser;
const findUser = (id) => {
    return User_model_1.userModel.findOne({ where: { 'User_ID': id } });
};
exports.findUser = findUser;
const deleteUser = (id) => {
    return User_model_1.userModel.destroy({ where: { 'User_ID': id } });
};
exports.deleteUser = deleteUser;
