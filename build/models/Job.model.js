"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobModel = exports.category = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
var category;
(function (category) {
    category["Full_Time"] = "Full Time";
    category["Part_Time"] = "Part Time";
    category["Remote"] = "Remote";
})(category = exports.category || (exports.category = {}));
let jobModel = class jobModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
], jobModel.prototype, "Job_ID", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    })
], jobModel.prototype, "work_Title", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], jobModel.prototype, "User_ID", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    })
], jobModel.prototype, "owner_Email", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    })
], jobModel.prototype, "workType", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    })
], jobModel.prototype, "Position", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    })
], jobModel.prototype, "apply_Method", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    })
], jobModel.prototype, "description", void 0);
jobModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'jobs',
        timestamps: false
    })
], jobModel);
exports.jobModel = jobModel;
