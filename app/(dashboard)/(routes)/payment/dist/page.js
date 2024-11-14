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
var stripe_js_1 = require("@stripe/stripe-js");
var axios_1 = require("axios");
// Load Stripe outside of a component to avoid recreating it on re-renders
var stripePromise = stripe_js_1.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
var PaymentPage = function () {
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var handleCheckout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, stripe, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, axios_1["default"].post('/api/checkout-session')];
                case 2:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, stripePromise];
                case 3:
                    stripe = _a.sent();
                    // Redirect to Stripe Checkout
                    return [4 /*yield*/, (stripe === null || stripe === void 0 ? void 0 : stripe.redirectToCheckout({ sessionId: data.sessionId }))];
                case 4:
                    // Redirect to Stripe Checkout
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error during checkout:', error_1);
                    alert('Failed to redirect to Stripe Checkout');
                    return [3 /*break*/, 7];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white" },
        react_1["default"].createElement("h1", { className: "text-3xl mb-6" }, "Complete Your Payment"),
        react_1["default"].createElement("button", { onClick: handleCheckout, disabled: loading, className: "px-6 py-3 bg-blue-600 rounded-lg " + (loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700') }, loading ? 'Processing...' : 'Go to Payment')));
};
exports["default"] = PaymentPage;
