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
exports.dynamic = exports.POST = void 0;
var headers_1 = require("next/headers");
var server_1 = require("next/server");
var stripe_1 = require("@/lib/stripe");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
var headers_2 = require("next/headers");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, signature, event, session, _a, userId, planId, creditsToAdd, cookieStore_1, supabase, _b, existingCredits, checkError, currentCredits, newTotalCredits, insertError, updateError, _c, verifyCredits, verifyError, subscriptionError, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 11, , 12]);
                    console.log('Webhook received');
                    return [4 /*yield*/, req.text()];
                case 1:
                    body = _d.sent();
                    signature = headers_1.headers().get('stripe-signature');
                    event = void 0;
                    try {
                        event = stripe_1.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
                        console.log('Event type:', event.type);
                    }
                    catch (err) {
                        console.error('Webhook signature verification failed:', err);
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Invalid signature' }, { status: 400 })];
                    }
                    if (!(event.type === 'checkout.session.completed')) return [3 /*break*/, 10];
                    session = event.data.object;
                    console.log('Session metadata:', session.metadata);
                    _a = session.metadata, userId = _a.userId, planId = _a.planId, creditsToAdd = _a.creditsToAdd;
                    console.log('Extracted data:', { userId: userId, planId: planId, creditsToAdd: creditsToAdd });
                    if (!userId || !planId || !creditsToAdd) {
                        console.error('Missing required metadata:', { userId: userId, planId: planId, creditsToAdd: creditsToAdd });
                        throw new Error('Missing required metadata');
                    }
                    return [4 /*yield*/, headers_2.cookies()];
                case 2:
                    cookieStore_1 = _d.sent();
                    supabase = auth_helpers_nextjs_1.createRouteHandlerClient({
                        cookies: function () { return cookieStore_1; }
                    });
                    console.log('Checking existing credits for user:', userId);
                    return [4 /*yield*/, supabase
                            .from('user_credits')
                            .select('*') // Select all fields to see full record
                            .eq('user_id', userId)
                            .single()];
                case 3:
                    _b = _d.sent(), existingCredits = _b.data, checkError = _b.error;
                    console.log('Existing credits query result:', { existingCredits: existingCredits, checkError: checkError });
                    if (checkError && checkError.code !== 'PGRST116') {
                        console.error('Error checking existing credits:', checkError);
                        throw checkError;
                    }
                    currentCredits = (existingCredits === null || existingCredits === void 0 ? void 0 : existingCredits.credits_remaining) || 0;
                    newTotalCredits = currentCredits + parseInt(creditsToAdd);
                    console.log('Credits calculation:', {
                        currentCredits: currentCredits,
                        creditsToAdd: creditsToAdd,
                        newTotalCredits: newTotalCredits,
                        userId: userId
                    });
                    if (!!existingCredits) return [3 /*break*/, 5];
                    console.log('Attempting to create new user_credits record');
                    return [4 /*yield*/, supabase
                            .from('user_credits')
                            .insert([{
                                user_id: userId,
                                credits_remaining: parseInt(creditsToAdd),
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString()
                            }])];
                case 4:
                    insertError = (_d.sent()).error;
                    if (insertError) {
                        console.error('Error inserting new credits:', insertError);
                        throw insertError;
                    }
                    return [3 /*break*/, 7];
                case 5:
                    // Update existing record
                    console.log('Attempting to update existing user_credits record');
                    return [4 /*yield*/, supabase
                            .from('user_credits')
                            .update({
                            credits_remaining: newTotalCredits,
                            updated_at: new Date().toISOString()
                        })
                            .eq('user_id', userId)];
                case 6:
                    updateError = (_d.sent()).error;
                    if (updateError) {
                        console.error('Error updating credits:', updateError);
                        throw updateError;
                    }
                    _d.label = 7;
                case 7: return [4 /*yield*/, supabase
                        .from('user_credits')
                        .select('credits_remaining')
                        .eq('user_id', userId)
                        .single()];
                case 8:
                    _c = _d.sent(), verifyCredits = _c.data, verifyError = _c.error;
                    console.log('Verification of credits update:', {
                        verifyCredits: verifyCredits,
                        verifyError: verifyError
                    });
                    // Update subscription status
                    console.log('Updating subscription status');
                    return [4 /*yield*/, supabase
                            .from('user_subscriptions')
                            .upsert({
                            user_id: userId,
                            plan_id: planId,
                            status: 'active',
                            started_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        })];
                case 9:
                    subscriptionError = (_d.sent()).error;
                    if (subscriptionError) {
                        console.error('Error updating subscription:', subscriptionError);
                        throw subscriptionError;
                    }
                    console.log("Successfully completed all operations for user " + userId + ":", {
                        planId: planId,
                        newTotalCredits: newTotalCredits,
                        finalCredits: verifyCredits === null || verifyCredits === void 0 ? void 0 : verifyCredits.credits_remaining
                    });
                    _d.label = 10;
                case 10: return [2 /*return*/, server_1.NextResponse.json({ received: true })];
                case 11:
                    error_1 = _d.sent();
                    console.error('Webhook error:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            error: 'Webhook handler failed',
                            details: error_1 instanceof Error ? error_1.message : 'Unknown error'
                        }, { status: 500 })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
exports.dynamic = 'force-dynamic';
