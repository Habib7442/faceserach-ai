"use client";
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var nextjs_1 = require("@clerk/nextjs");
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var framer_motion_1 = require("framer-motion");
var sonner_1 = require("sonner");
var Upload = function () {
    var _a = react_1.useState(null), selectedImage = _a[0], setSelectedImage = _a[1];
    var _b = react_1.useState(null), resultImage = _b[0], setResultImage = _b[1];
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = react_1.useState(false), dragActive = _d[0], setDragActive = _d[1];
    var _e = react_1.useState(null), userCredits = _e[0], setUserCredits = _e[1];
    react_1.useEffect(function () {
        checkCredits();
    }, []);
    var checkCredits = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/credits/check')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setUserCredits(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error checking credits:', error_1);
                    sonner_1.toast.error('Failed to check credits');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // const handleUpgradeClick = async () => {
    //   try {
    //     const response = await fetch('/api/create-checkout-session', {
    //       method: 'POST',
    //     });
    //     const data = await response.json();
    //     if (data.url) {
    //       window.location.href = data.url;
    //     }
    //   } catch (error) {
    //     console.error('Error creating checkout session:', error);
    //     toast.error('Failed to start checkout process');
    //   }
    // };
    var handleImageUpload = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var file, response, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file)
                        return [2 /*return*/];
                    // Check credits
                    if (!(userCredits === null || userCredits === void 0 ? void 0 : userCredits.is_unlimited) && (userCredits === null || userCredits === void 0 ? void 0 : userCredits.credits_remaining) === 0) {
                        sonner_1.toast.error('No credits remaining. Please upgrade to continue.');
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, 6, 7]);
                    setIsLoading(true);
                    setSelectedImage(file);
                    return [4 /*yield*/, fetch('/api/credits/use', {
                            method: 'POST'
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error('Failed to use credit');
                    }
                    // Simulate API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 3:
                    // Simulate API call
                    _b.sent();
                    setResultImage("/dummy.jpg");
                    // Refresh credits
                    return [4 /*yield*/, checkCredits()];
                case 4:
                    // Refresh credits
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    error_2 = _b.sent();
                    console.error('Error:', error_2);
                    sonner_1.toast.error('Failed to process image');
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    var handleDrop = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    file = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!(file && file.type.startsWith('image/'))) return [3 /*break*/, 2];
                    setIsLoading(true);
                    setSelectedImage(file);
                    // Simulate API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 1:
                    // Simulate API call
                    _b.sent();
                    setResultImage("/dummy.jpg");
                    setIsLoading(false);
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-slate-200 py-10 px-4 md:px-8" },
        react_1["default"].createElement("div", { className: "max-w-6xl mx-auto mt-14" },
            react_1["default"].createElement("div", { className: "mb-8 flex justify-between items-center bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50" },
                react_1["default"].createElement("div", { className: "flex items-center space-x-4" },
                    react_1["default"].createElement("div", { className: "text-lg" }, (userCredits === null || userCredits === void 0 ? void 0 : userCredits.is_unlimited) ? (react_1["default"].createElement("span", { className: "text-green-400" }, "Unlimited Credits")) : (react_1["default"].createElement("span", null,
                        "Credits Remaining: ",
                        react_1["default"].createElement("span", { className: "font-bold text-blue-400" }, (userCredits === null || userCredits === void 0 ? void 0 : userCredits.credits_remaining) || 0))))),
                (userCredits === null || userCredits === void 0 ? void 0 : userCredits.credits_remaining) === 0 && (react_1["default"].createElement(link_1["default"], { href: "/payment" },
                    react_1["default"].createElement(button_1.Button, { className: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" },
                        react_1["default"].createElement(lucide_react_1.CreditCard, { className: "mr-2 h-4 w-4" }),
                        "Upgrade")))),
            react_1["default"].createElement("div", { className: "flex justify-between items-center mb-12" },
                react_1["default"].createElement(link_1["default"], { href: "/" },
                    react_1["default"].createElement(button_1.Button, { variant: "ghost", className: "text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300" },
                        react_1["default"].createElement(lucide_react_1.Home, { className: "mr-2 h-5 w-5" }),
                        "Back to Home")),
                react_1["default"].createElement(nextjs_1.SignOutButton, null,
                    react_1["default"].createElement(button_1.Button, { className: "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white transition-all duration-300" }, "Sign Out"))),
            react_1["default"].createElement("div", { className: "bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-700/50" },
                react_1["default"].createElement("h1", { className: "text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300" }, "Image Upload & Analysis"),
                react_1["default"].createElement("div", { className: "relative mb-8 " + (!selectedImage ? 'h-64' : 'h-auto'), onDragEnter: handleDrag }, !selectedImage && (react_1["default"].createElement("div", { className: "h-full border-2 border-dashed rounded-xl transition-all duration-300 " + (dragActive
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 hover:border-slate-500'), onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop },
                    react_1["default"].createElement("label", { htmlFor: "image-upload", className: "flex flex-col items-center justify-center h-full cursor-pointer" },
                        react_1["default"].createElement(lucide_react_1.Upload, { className: "h-12 w-12 mb-4 text-slate-400" }),
                        react_1["default"].createElement("span", { className: "text-lg font-medium text-slate-300" }, "Drag and drop your image here or click to browse"),
                        react_1["default"].createElement("span", { className: "text-sm text-slate-400 mt-2" }, "Supports: JPG, PNG, GIF (max 5MB)")),
                    react_1["default"].createElement("input", { id: "image-upload", type: "file", accept: "image/*", onChange: handleImageUpload, className: "hidden" })))),
                react_1["default"].createElement(framer_motion_1.AnimatePresence, null, (selectedImage || resultImage) && (react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, className: "grid md:grid-cols-2 gap-8" },
                    selectedImage && (react_1["default"].createElement("div", { className: "bg-slate-900/50 p-6 rounded-xl border border-slate-700/50" },
                        react_1["default"].createElement("h2", { className: "text-xl font-semibold mb-4 text-slate-300" }, "Uploaded Image"),
                        react_1["default"].createElement("div", { className: "relative aspect-square rounded-lg overflow-hidden" },
                            react_1["default"].createElement(image_1["default"], { src: URL.createObjectURL(selectedImage), alt: "Uploaded preview", fill: true, className: "object-cover" })))),
                    isLoading ? (react_1["default"].createElement("div", { className: "bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 flex items-center justify-center" },
                        react_1["default"].createElement(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-blue-500" }))) : (resultImage && (react_1["default"].createElement("div", { className: "bg-slate-900/50 p-6 rounded-xl border border-slate-700/50" },
                        react_1["default"].createElement("h2", { className: "text-xl font-semibold mb-4 text-slate-300" }, "Result"),
                        react_1["default"].createElement("div", { className: "relative aspect-square rounded-lg overflow-hidden" },
                            react_1["default"].createElement(image_1["default"], { src: resultImage, alt: "Result preview", fill: true, className: "object-cover" }))))))))))));
};
exports["default"] = Upload;
