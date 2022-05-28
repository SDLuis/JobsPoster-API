"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerAccess = exports.accessToAdd = exports.onlyAdmin = void 0;
const onlyAdmin = (role) => {
    if (role === 'admin') {
        return true;
    }
    else {
        return 'Access denied';
    }
};
exports.onlyAdmin = onlyAdmin;
const accessToAdd = (role) => {
    if (role === 'poster' || 'admin') {
        return true;
    }
    else {
        return 'Access denied';
    }
};
exports.accessToAdd = accessToAdd;
const ownerAccess = (user, job, role) => {
    if (user === job || role === 'admin') {
        return true;
    }
    else {
        return 'Access denied';
    }
};
exports.ownerAccess = ownerAccess;
