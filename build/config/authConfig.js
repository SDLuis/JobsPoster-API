"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    secret: process.env.AUTH_SECRET,
    expires: process.env.AUTH_EXPIRES || '1d',
    rounds: process.env.AUTH_ROUNDS || 8
};
