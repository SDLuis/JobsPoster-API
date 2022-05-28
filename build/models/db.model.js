"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const User_model_1 = require("./User.model");
const Job_model_1 = require("./Job.model");
const sequelize = new sequelize_typescript_1.Sequelize(dbConfig_1.default.database, dbConfig_1.default.user, dbConfig_1.default.password, {
    host: dbConfig_1.default.host,
    models: [Job_model_1.jobModel, User_model_1.userModel],
    dialect: dbConfig_1.default.dialect,
    pool: {
        max: dbConfig_1.default.pool.max,
        min: dbConfig_1.default.pool.min,
        acquire: dbConfig_1.default.pool.acquire,
        idle: dbConfig_1.default.pool.idle,
    },
});
let db = {
    Sequelize: sequelize_typescript_1.Sequelize,
    sequelize,
};
User_model_1.userModel.hasMany(Job_model_1.jobModel, { foreignKey: 'User_ID' });
Job_model_1.jobModel.belongsTo(User_model_1.userModel, { foreignKey: 'User_ID' });
exports.default = db;
