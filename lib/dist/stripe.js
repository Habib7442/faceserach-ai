"use strict";
exports.__esModule = true;
exports.STRIPE_CONFIGS = exports.stripe = void 0;
// lib/stripe.ts
var stripe_1 = require("stripe");
if (!process.env.STPIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}
exports.stripe = new stripe_1["default"](process.env.STPIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
});
exports.STRIPE_CONFIGS = {
    UNLIMITED_PRICE_ID: process.env.STRIPE_PRICE_ID,
    SUCCESS_URL: process.env.NEXT_PUBLIC_APP_URL + "/upload",
    CANCEL_URL: process.env.NEXT_PUBLIC_APP_URL + "/pricing"
};
