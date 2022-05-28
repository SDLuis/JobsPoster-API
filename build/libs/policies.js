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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerAccess = exports.posterAccess = exports.Admin = void 0;
const policiesService = __importStar(require("../services/policies.service"));
const Admin = (req, res, next) => {
    try {
        const user = req.token;
        const response = policiesService.onlyAdmin(user.role);
        if (response === true) {
            next();
        }
        else {
            res.status(400).send(response);
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
exports.Admin = Admin;
const posterAccess = (req, res, next) => {
    try {
        const user = req.token;
        const response = policiesService.accessToAdd(user.role);
        if (response === true) {
            next();
        }
        else {
            res.status(400).send(response);
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
exports.posterAccess = posterAccess;
const ownerAccess = (req, res, next) => {
    try {
        const fullUser = req.token;
        const fullJob = req.json;
        const userId = fullUser.User_ID;
        const userRole = fullUser.role;
        const job = fullJob === null || fullJob === void 0 ? void 0 : fullJob.dataValues.User_ID;
        if (!fullJob) {
            throw new Error('Incorret Job ID');
        }
        else {
            const response = policiesService.ownerAccess(userId, job, userRole);
            if (response === true) {
                next();
            }
            else {
                res.status(400).send(response);
            }
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
exports.ownerAccess = ownerAccess;
