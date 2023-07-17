"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Task_1 = __importDefault(require("./Task"));
var Card = function (cardData) {
    return (react_1.default.createElement("div", { className: "card-container" },
        react_1.default.createElement("h2", { className: "card-title" }, cardData === null || cardData === void 0 ? void 0 : cardData.title), cardData === null || cardData === void 0 ? void 0 :
        cardData.tasks.map(function (task, index) { return (react_1.default.createElement(Task_1.default, { title: task.title, description: task.description, key: index })); })));
};
exports.default = Card;
