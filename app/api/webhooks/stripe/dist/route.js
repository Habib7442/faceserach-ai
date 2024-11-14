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
exports.config = exports.POST = void 0;
// app/api/webhooks/stripe/route.ts
var headers_1 = require("next/headers");
var server_1 = require("next/server");
var stripe_1 = require("@/lib/stripe");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
var headers_2 = require("next/headers");
var endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, sig, event, session, userId, supabase, existingUser, updateError, insertError, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, req.text()];
                case 1:
                    body = _a.sent();
                    sig = headers_1.headers().get('stripe-signature');
                    if (!sig || !endpointSecret) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Missing stripe signature or webhook secret' }, { status: 400 })];
                    }
                    event = void 0;
                    try {
                        event = stripe_1.stripe.webhooks.constructEvent(body, sig, endpointSecret);
                    }
                    catch (err) {
                        console.error('Webhook signature verification failed:', err);
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Invalid signature' }, { status: 400 })];
                    }
                    if (!(event.type === 'checkout.session.completed')) return [3 /*break*/, 6];
                    session = event.data.object;
                    userId = session.metadata.userId;
                    if (!userId) {
                        throw new Error('No userId found in session metadata');
                    }
                    supabase = auth_helpers_nextjs_1.createRouteHandlerClient({ cookies: headers_2.cookies });
                    return [4 /*yield*/, supabase
                            .from('user_credits')
                            .select('*')
                            .eq('user_id', userId)
                            .single()];
                case 2:
                    existingUser = (_a.sent()).data;
                    if (!existingUser) return [3 /*break*/, 4];
                    return [4 /*yield*/, supabase
                            .from('user_credits')
                            .update({
                            credits_remaining: existingUser.credits_remaining + 200,
                            updated_at: new Date().toISOString()
                        })
                            .eq('user_id', userId)];
                case 3:
                    updateError = (_a.sent()).error;
                    if (updateError)
                        throw updateError;
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, supabase
                        .from('user_credits')
                        .insert([
                        {
                            user_id: userId,
                            credits_remaining: 200,
                            is_unlimited: false
                        }
                    ])];
                case 5:
                    insertError = (_a.sent()).error;
                    if (insertError)
                        throw insertError;
                    _a.label = 6;
                case 6: return [2 /*return*/, server_1.NextResponse.json({ received: true })];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error handling webhook:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
// Configure the endpoint to handle raw body
exports.config = {
    api: {
        bodyParser: false
    }
};
