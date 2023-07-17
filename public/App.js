"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./styles/style.scss");
var Card_1 = __importDefault(require("./components/Card"));
var App = function () {
    var data = [
        {
            title: "To Do",
            tasks: [
                {
                    title: "Helpdesk call AA999",
                    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, asperiores ea voluptate esse totam nostrum officiis maiores aspernatur vero fugiat voluptates, explicabo sapiente nemo beatae. Harum, velit saepe? Rerum fugit tempore perferendis inventore similique obcaecati excepturi laborum eveniet corporis quibusdam!",
                    status: "todo",
                },
                {
                    title: "Helpdesk call AA999",
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque fuga sint?",
                    status: "todo",
                },
                {
                    title: "Helpdesk call AA999",
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque fuga sint?",
                    status: "todo",
                },
                {
                    title: "Helpdesk call AA999",
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque fuga sint?",
                    status: "todo",
                },
            ],
        },
        {
            title: "Development",
            tasks: [
                {
                    title: "Helpdesk call AA999",
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque fuga sint?",
                    status: "development",
                },
                {
                    title: "Helpdesk call AA999",
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque fuga sint?",
                    status: "development",
                },
            ],
        },
    ];
    return (react_1.default.createElement("div", { className: "app-container" },
        react_1.default.createElement("div", { className: "kanban-header" },
            react_1.default.createElement("h1", null, "Kanban Board"),
            react_1.default.createElement("div", { className: "search-container" },
                react_1.default.createElement("input", { autoFocus: true, type: "text", placeholder: "Looking for tasks?" }),
                react_1.default.createElement("img", { src: "./images/search.png", alt: "", className: "searchicon" }))),
        react_1.default.createElement("div", { className: "kanban-content" }, data.map(function (card, index) { return (react_1.default.createElement(Card_1.default, { title: card.title, tasks: card.tasks, key: index })); }))));
};
exports.default = App;
