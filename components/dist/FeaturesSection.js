"use strict";
exports.__esModule = true;
var react_1 = require("react");
var FeaturesCard_1 = require("./FeaturesCard");
var FeaturesSection = function () {
    return (react_1["default"].createElement("section", { className: "relative w-full min-h-screen py-10 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" },
        react_1["default"].createElement("div", { className: "relative z-10 container mx-auto px-4" },
            react_1["default"].createElement("div", { className: "text-center mb-16 space-y-4" },
                react_1["default"].createElement("h2", { className: "text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300" }, "Features"),
                react_1["default"].createElement("p", { className: "text-lg md:text-xl text-slate-400 max-w-2xl mx-auto" }, "Discover the cutting-edge capabilities that make our AI face matching technology stand out")),
            react_1["default"].createElement("div", { className: "absolute top-40 left-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl" }),
            react_1["default"].createElement("div", { className: "absolute bottom-40 right-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl" }),
            react_1["default"].createElement("div", { className: "relative" },
                react_1["default"].createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/50 to-transparent pointer-events-none" }),
                react_1["default"].createElement(FeaturesCard_1.CardHoverEffectDemo, null)),
            react_1["default"].createElement("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" }))));
};
exports["default"] = FeaturesSection;
