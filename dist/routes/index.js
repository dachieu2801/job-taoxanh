"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoute_1 = __importDefault(require("./UserRoute"));
function route(app) {
    app.use('api/v1/user', UserRoute_1.default);
}
exports.default = route;
