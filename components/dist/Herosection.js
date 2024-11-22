'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var image_1 = require("next/image");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var nextjs_1 = require("@clerk/nextjs");
var framer_motion_1 = require("framer-motion");
var Herosection = function () {
    var userId = nextjs_1.useAuth().userId;
    var scrollYProgress = framer_motion_1.useScroll().scrollYProgress;
    var scale = framer_motion_1.useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    return (React.createElement("div", { className: "relative w-full h-screen flex justify-center items-center overflow-hidden" },
        React.createElement("div", { className: "absolute inset-0" },
            React.createElement("div", { className: "perspective-[1000px]" },
                React.createElement(framer_motion_1.motion.div, { style: { scale: scale }, className: "transform-gpu w-full h-full" },
                    React.createElement(image_1["default"], { src: "/hero.png", alt: "AI Face Search Background", className: "object-cover w-full h-full", layout: "fill", priority: true, sizes: "100vw" })),
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-[#0f2027]/90 via-[#203a43]/80 to-[#2c5364]/70" }))),
        React.createElement("div", { className: "relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto" },
            React.createElement(framer_motion_1.motion.h1, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8 }, className: "text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 drop-shadow-lg" }, "Welcome to FaceSearch AI"),
            React.createElement(framer_motion_1.motion.h2, { initial: { y: -30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, delay: 0.2 }, className: "text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-cyan-300 to-slate-400 font-medium" }, "Experience AI-Powered Face Matching Like Never Before"),
            React.createElement(framer_motion_1.motion.div, { initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, delay: 0.4 }, className: "flex flex-col items-center space-y-6" },
                React.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-4 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm" },
                    React.createElement("div", { className: "flex items-center" },
                        __spreadArrays(Array(5)).map(function (_, index) { return (React.createElement(lucide_react_1.Star, { key: index, className: "w-6 h-6 text-yellow-400 fill-yellow-400" })); }),
                        React.createElement("span", { className: "ml-2 text-white font-medium" }, "5.0")),
                    React.createElement("div", { className: "hidden sm:block w-px h-8 bg-slate-600" }),
                    React.createElement("div", { className: "flex items-center text-white" },
                        React.createElement(lucide_react_1.Download, { className: "w-5 h-5 mr-2" }),
                        React.createElement("span", { className: "font-medium" }, "1K+ Downloads"))),
                React.createElement(link_1["default"], { href: userId ? "/upload" : "/sign-in" },
                    React.createElement(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                        React.createElement(button_1.Button, { className: "bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-cyan-300 font-semibold px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" },
                            userId ? "Explore" : "Get Started",
                            React.createElement(lucide_react_1.ArrowRight, { className: "ml-2 h-5 w-5" }))))))));
};
exports["default"] = Herosection;
