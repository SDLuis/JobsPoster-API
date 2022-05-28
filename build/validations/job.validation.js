"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewWork = void 0;
const utils_1 = require("../utils/utils");
const parseWorkTitle = (workTitleFromRequest) => {
    if (!(0, utils_1.isString)(workTitleFromRequest) || (0, utils_1.notEmpty)(workTitleFromRequest)) {
        throw new Error('Invalid Work title');
    }
    return workTitleFromRequest;
};
const parseUserId = (userIdFromRequest) => {
    if (!(0, utils_1.isNumber)(userIdFromRequest) || (0, utils_1.notEmpty)(userIdFromRequest)) {
        throw new Error('Invalid User_ID');
    }
    return userIdFromRequest;
};
const parseOwnerEmail = (ownerEmailFromRequest) => {
    if (!(0, utils_1.isString)(ownerEmailFromRequest) || (0, utils_1.notEmpty)(ownerEmailFromRequest)) {
        throw new Error('Invalid Email');
    }
    return ownerEmailFromRequest;
};
const parseWorkType = (workTypeFromRequest) => {
    if (!(0, utils_1.isString)(workTypeFromRequest) || !(0, utils_1.isCategory)(workTypeFromRequest) || (0, utils_1.notEmpty)(workTypeFromRequest)) {
        throw new Error('Invalid Work Type');
    }
    return workTypeFromRequest;
};
const parsePosition = (positionFromRequest) => {
    if (!(0, utils_1.isString)(positionFromRequest) || (0, utils_1.notEmpty)(positionFromRequest)) {
        throw new Error('Invalid Position');
    }
    return positionFromRequest;
};
const parseApplyMethod = (applyMethodFromRequest) => {
    if (!(0, utils_1.isString)(applyMethodFromRequest) || (0, utils_1.notEmpty)(applyMethodFromRequest)) {
        throw new Error('Invalid Apply Method');
    }
    return applyMethodFromRequest;
};
const parseDescription = (descriptionFromRequest) => {
    if (!(0, utils_1.isString)(descriptionFromRequest) || (0, utils_1.notEmpty)(descriptionFromRequest)) {
        throw new Error('Invalid Description');
    }
    return descriptionFromRequest;
};
const toNewWork = (object, userIdFromRequest, emailFromRequest) => {
    const newJob = {
        work_Title: parseWorkTitle(object.work_Title),
        User_ID: parseUserId(userIdFromRequest),
        owner_Email: parseOwnerEmail(emailFromRequest),
        workType: parseWorkType(object.workType),
        Position: parsePosition(object.Position),
        apply_Method: parseApplyMethod(object.apply_Method),
        description: parseDescription(object.description),
    };
    return newJob;
};
exports.toNewWork = toNewWork;
