"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var local_1 = require("next/font/local");
require("./globals.css");
var nextjs_1 = require("@clerk/nextjs");
var sonner_1 = require("@/components/ui/sonner");
var geistSans = local_1["default"]({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900"
});
var geistMono = local_1["default"]({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900"
});
exports.metadata = {
    title: "Facesearch AI",
    description: "Generated by create next app"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement(nextjs_1.ClerkProvider, null,
        React.createElement("html", { lang: "en" },
            React.createElement("body", { className: geistSans.variable + " " + geistMono.variable + " antialiased relative" },
                React.createElement("main", null, children),
                React.createElement(sonner_1.Toaster, null)))));
}
exports["default"] = RootLayout;