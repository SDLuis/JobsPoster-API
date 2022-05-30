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
exports.deleteJob = exports.findJobByCategory = exports.findJob = exports.editJobs = exports.addJobs = exports.getJobsWithoutSensitiveInfo = exports.getJobs = void 0;
require("../models/db.model");
const Job_model_1 = require("../models/Job.model");
const getJobs = (Jobs) => {
    return Jobs;
};
exports.getJobs = getJobs;
const getJobsWithoutSensitiveInfo = (jobs) => {
    return jobs.map(({ Job_ID, work_Title, workType, Position, apply_Method, description }) => {
        return {
            Job_ID, work_Title, workType, Position, apply_Method, description
        };
    });
};
exports.getJobsWithoutSensitiveInfo = getJobsWithoutSensitiveInfo;
const addJobs = (newJobsEntry) => {
    const newJobs = Object.assign({}, newJobsEntry);
    Job_model_1.jobModel.create(newJobs);
    return newJobs;
};
exports.addJobs = addJobs;
const editJobs = (id, newJobEntry) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Job_model_1.jobModel.update(newJobEntry, { where: { 'Job_ID': id } }).then(result => {
        return result;
    });
    return +result;
});
exports.editJobs = editJobs;
const findJob = (id) => {
    return Job_model_1.jobModel.findOne({ where: { 'Job_ID': id } });
};
exports.findJob = findJob;
const findJobByCategory = (category) => {
    return Job_model_1.jobModel.findAll({ where: { 'workType': category } });
};
exports.findJobByCategory = findJobByCategory;
const deleteJob = (id) => {
    return Job_model_1.jobModel.destroy({ where: { 'Job_ID': id } });
};
exports.deleteJob = deleteJob;
