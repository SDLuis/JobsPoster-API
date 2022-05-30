"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Job_route_1 = __importDefault(require("../routes/Job.route"));
const User_route_1 = __importDefault(require("../routes/User.route"));
const Auth_route_1 = __importDefault(require("../routes/Auth.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/jobs', Job_route_1.default);
app.use('/users', User_route_1.default);
app.use('/auth', Auth_route_1.default);
app.use((0, cors_1.default)());
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (_req, res) => {
    res.status(200).send('WELCOME!!');
});
exports.default = app;
