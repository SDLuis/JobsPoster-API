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
exports.reqJob = exports.deleteJob = exports.findJobByCategory = exports.findJob = exports.editJob = exports.newJob = exports.getJobs = void 0;
const jobService = __importStar(require("../services/job.service"));
const Job_model_1 = require("../models/Job.model");
const jobValidation = __importStar(require("../validations/job.validation"));
const User_model_1 = require("../models/User.model");
const getJobs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Job_model_1.jobModel.findAll({ include: { model: User_model_1.userModel, attributes: { exclude: ['password'] } } }).then(result => {
            res.send(jobService.getJobs(result));
        });
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.getJobs = getJobs;
const newJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const NewJobEntry = jobValidation.toNewWork(req.body, req.token.User_ID, req.token.email);
        const addedJob = yield jobService.addJobs(NewJobEntry);
        res.status(200).send(addedJob);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.newJob = newJob;
const editJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const job = yield jobService.editJobs(id, req.body);
        if (+job == 1) {
            res.status(200).send('Job Edit');
        }
        else {
            res.status(400).send('Error');
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.editJob = editJob;
const findJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const job = yield jobService.findJob(id);
        res.status(200).send(job);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.findJob = findJob;
const findJobByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const job = yield jobService.findJobByCategory(category);
        res.status(200).send(job);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.findJobByCategory = findJobByCategory;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = +req.params.id;
        yield ((_a = jobService.deleteJob(id)) === null || _a === void 0 ? void 0 : _a.then(result => {
            if (result == 1) {
                res.status(200).send('Job deleted');
            }
            else {
                res.status(400).send('Error');
            }
        }));
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.deleteJob = deleteJob;
const reqJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const job = yield jobService.findJob(id);
        req.json = job;
        next();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.reqJob = reqJob;
