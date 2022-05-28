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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = __importDefault(require("./libs/middlewares"));
const db_model_1 = __importDefault(require("./models/db.model"));
const PORT = process.env.PORT || 5000;
middlewares_1.default.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT} in development mode
Press CTRL-C to stop`);
    db_model_1.default.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("database connected");
        try {
            yield db_model_1.default.sequelize.sync({ force: false });
        }
        catch (error) {
            console.log(error.message);
        }
    })).catch((e) => {
        console.log(e.message);
    });
});
