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
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var nextjs_1 = require("@clerk/nextjs");
var react_1 = require("react");
var sonner_1 = require("sonner");
var PricingSection = function () {
    var _a = nextjs_1.useAuth(), isSignedIn = _a.isSignedIn, isLoaded = _a.isLoaded;
    var _b = react_1.useState(null), loadingPlan = _b[0], setLoadingPlan = _b[1];
    var pricingPlans = [
        {
            id: "basic",
            name: "Basic",
            price: "$9.99",
            period: "month",
            description: "Perfect for individuals starting with face search",
            features: [
                "10 Face searches per day",
                "Basic web search results",
                "Email support",
                "Export search history",
                "Standard API access",
            ],
            highlighted: false,
            buttonText: "Get Started",
            stripePriceId: "price_1QNsUeSABw0Heq1mTI8fY0jE"
        },
        {
            id: "pro",
            name: "Pro",
            price: "$24.99",
            period: "month",
            description: "Ideal for professionals and small teams",
            features: [
                "50 Face searches per day",
                "Advanced search filters",
                "Priority support",
                "Contact information finder",
                "Custom poem generation",
                "Advanced API access",
                "Bulk search capability",
            ],
            highlighted: true,
            buttonText: "Try Pro Plan",
            badge: "Most Popular",
            stripePriceId: "price_1QNsWGSABw0Heq1mCNToLIF2"
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: "Custom",
            period: "month",
            description: "For organizations requiring advanced solutions",
            features: [
                "Unlimited face searches",
                "Dedicated support team",
                "Custom integration",
                "Advanced analytics",
                "White-label option",
                "Enterprise API access",
                "Custom feature development",
            ],
            highlighted: false,
            buttonText: "Contact Sales",
            stripePriceId: "price_1QNsYkSABw0Heq1mPMQtOsBB"
        },
    ];
    var handlePurchase = function (plan) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isLoaded)
                        return [2 /*return*/];
                    if (!isSignedIn) {
                        sonner_1.toast("You need to be signed in to purchase a plan");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    setLoadingPlan(plan.id);
                    return [4 /*yield*/, fetch("/api/create-checkout-session", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ planId: plan.id })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.error || "Failed to create checkout session");
                    }
                    // Redirect to Stripe Checkout
                    window.location.href = data.url;
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("Purchase error:", error_1);
                    sonner_1.toast("Failed to initiate checkout. Please try again.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoadingPlan(null);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("section", { className: "relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20 px-4" },
        React.createElement("div", { className: "absolute inset-0 overflow-hidden" },
            React.createElement("div", { className: "absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" }),
            React.createElement("div", { className: "absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" })),
        React.createElement("div", { className: "relative z-10 max-w-7xl mx-auto" },
            React.createElement("div", { className: "text-center space-y-4 mb-16" },
                React.createElement("h2", { className: "text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200" }, "Choose Your Plan"),
                React.createElement("p", { className: "text-lg md:text-xl text-slate-400 max-w-2xl mx-auto" }, "Select the perfect plan that suits your needs and unlock the full potential of FaceSearch AI")),
            React.createElement("div", { className: "grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" }, pricingPlans.map(function (plan) { return (React.createElement("div", { key: plan.id, className: "relative rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105\n                " + (plan.highlighted
                    ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/50 hover:border-blue-400"
                    : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-slate-600") + "\n              " },
                plan.badge && (React.createElement("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2" },
                    React.createElement("div", { className: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1" },
                        React.createElement(lucide_react_1.Star, { className: "w-4 h-4" }),
                        plan.badge))),
                React.createElement("div", { className: "p-8" },
                    React.createElement("h3", { className: "text-2xl font-bold text-white mb-4" }, plan.name),
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("span", { className: "text-4xl font-bold text-white" }, plan.price),
                        plan.price !== "Custom" && (React.createElement("span", { className: "text-slate-400" },
                            "/",
                            plan.period))),
                    React.createElement("p", { className: "text-slate-400 mb-6" }, plan.description),
                    React.createElement(button_1.Button, { onClick: function () { return handlePurchase(plan); }, disabled: loadingPlan === plan.id || !isLoaded, className: "w-full mb-8 " + (plan.highlighted
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-200") }, loadingPlan === plan.id ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Loader2, { className: "w-4 h-4 mr-2 animate-spin" }),
                        "Processing...")) : (React.createElement(React.Fragment, null,
                        plan.buttonText,
                        plan.highlighted && React.createElement(lucide_react_1.Zap, { className: "w-4 h-4 ml-2" })))),
                    React.createElement("div", { className: "space-y-4" }, plan.features.map(function (feature, featureIndex) { return (React.createElement("div", { key: featureIndex, className: "flex items-center gap-3" },
                        React.createElement(lucide_react_1.Check, { className: "w-5 h-5 text-green-500 flex-shrink-0" }),
                        React.createElement("span", { className: "text-slate-300" }, feature))); }))))); })),
            React.createElement("div", { className: "text-center mt-16" },
                React.createElement("p", { className: "text-slate-400" },
                    "Have questions about our pricing?",
                    " ",
                    React.createElement("a", { href: "#", className: "text-blue-400 hover:text-blue-300 underline" }, "Check our FAQ"),
                    " ",
                    "or",
                    " ",
                    React.createElement("a", { href: "#", className: "text-blue-400 hover:text-blue-300 underline" }, "contact our team"))))));
};
exports["default"] = PricingSection;
