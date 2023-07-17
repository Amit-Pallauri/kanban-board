"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Task = function (taskData) {
    return (react_1.default.createElement("div", { className: "task-container" },
        react_1.default.createElement("h3", { className: "title" }, taskData === null || taskData === void 0 ? void 0 : taskData.title),
        react_1.default.createElement("p", { className: "description" }, taskData === null || taskData === void 0 ? void 0 : taskData.description)));
};
exports.default = Task;
