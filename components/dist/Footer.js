'use client';
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var image_1 = require("next/image");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var Footer = function () {
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var handleSubscribe = function (e) {
        e.preventDefault();
        // Add your newsletter subscription logic here
        setEmail("");
    };
    return (React.createElement("footer", { className: "bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200" },
        React.createElement("div", { className: "container mx-auto px-4 py-12" },
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
                React.createElement("div", { className: "space-y-4" },
                    React.createElement(link_1["default"], { href: "/", className: "block" },
                        React.createElement("div", { className: "relative h-12 w-48" },
                            React.createElement(image_1["default"], { src: "/logo.png", alt: "FaceSearch AI Logo", fill: true, className: "object-contain" }))),
                    React.createElement("p", { className: "text-slate-400 mt-4" }, "Revolutionizing face matching technology with advanced AI solutions for a more connected and secure future."),
                    React.createElement("div", { className: "flex space-x-4" },
                        React.createElement(link_1["default"], { href: "#", className: "hover:text-cyan-400 transition-colors" },
                            React.createElement(lucide_react_1.Facebook, { className: "h-5 w-5" })),
                        React.createElement(link_1["default"], { href: "#", className: "hover:text-cyan-400 transition-colors" },
                            React.createElement(lucide_react_1.Twitter, { className: "h-5 w-5" })),
                        React.createElement(link_1["default"], { href: "#", className: "hover:text-cyan-400 transition-colors" },
                            React.createElement(lucide_react_1.Instagram, { className: "h-5 w-5" })),
                        React.createElement(link_1["default"], { href: "#", className: "hover:text-cyan-400 transition-colors" },
                            React.createElement(lucide_react_1.Linkedin, { className: "h-5 w-5" })))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Quick Links"),
                    React.createElement("ul", { className: "space-y-2" }, ['Home', 'About', 'Features', 'Pricing', 'Contact'].map(function (item) { return (React.createElement("li", { key: item },
                        React.createElement(link_1["default"], { href: "/" + item.toLowerCase(), className: "text-slate-400 hover:text-cyan-400 transition-colors" }, item))); }))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Contact Us"),
                    React.createElement("ul", { className: "space-y-4" },
                        React.createElement("li", { className: "flex items-center space-x-3 text-slate-400" },
                            React.createElement(lucide_react_1.MapPin, { className: "h-5 w-5 text-cyan-400" }),
                            React.createElement("span", null, "123 AI Street, Tech Valley, CA 94043")),
                        React.createElement("li", { className: "flex items-center space-x-3 text-slate-400" },
                            React.createElement(lucide_react_1.Phone, { className: "h-5 w-5 text-cyan-400" }),
                            React.createElement("span", null, "+1 (555) 123-4567")),
                        React.createElement("li", { className: "flex items-center space-x-3 text-slate-400" },
                            React.createElement(lucide_react_1.Mail, { className: "h-5 w-5 text-cyan-400" }),
                            React.createElement("span", null, "support@facesearch.ai")))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Newsletter"),
                    React.createElement("p", { className: "text-slate-400 mb-4" }, "Subscribe to our newsletter for the latest updates and features."),
                    React.createElement("form", { onSubmit: handleSubscribe, className: "space-y-2" },
                        React.createElement(input_1.Input, { type: "email", placeholder: "Enter your email", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500", required: true }),
                        React.createElement(button_1.Button, { type: "submit", className: "w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white" },
                            "Subscribe",
                            React.createElement(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4" })))))),
        React.createElement("div", { className: "border-t border-slate-800" },
            React.createElement("div", { className: "container mx-auto px-4 py-6" },
                React.createElement("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" },
                    React.createElement("p", { className: "text-slate-400 text-sm text-center md:text-left" },
                        "\u00A9 ",
                        new Date().getFullYear(),
                        " FaceSearch AI. All rights reserved."),
                    React.createElement("div", { className: "flex space-x-6" },
                        React.createElement(link_1["default"], { href: "/privacy", className: "text-sm text-slate-400 hover:text-cyan-400 transition-colors" }, "Privacy Policy"),
                        React.createElement(link_1["default"], { href: "/terms", className: "text-sm text-slate-400 hover:text-cyan-400 transition-colors" }, "Terms of Service"),
                        React.createElement(link_1["default"], { href: "/cookies", className: "text-sm text-slate-400 hover:text-cyan-400 transition-colors" }, "Cookie Policy")))))));
};
exports["default"] = Footer;
