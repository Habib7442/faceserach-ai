"use strict";
exports.__esModule = true;
var AboutUs_1 = require("@/components/AboutUs");
var FeaturesSection_1 = require("@/components/FeaturesSection");
var Footer_1 = require("@/components/Footer");
var Herosection_1 = require("@/components/Herosection");
var PricingSection_1 = require("@/components/PricingSection");
var TestimonialsSection_1 = require("@/components/TestimonialsSection");
function Home() {
    return React.createElement("div", null,
        React.createElement(Herosection_1["default"], null),
        React.createElement(AboutUs_1["default"], null),
        React.createElement(FeaturesSection_1["default"], null),
        React.createElement(PricingSection_1["default"], null),
        React.createElement(TestimonialsSection_1["default"], null),
        React.createElement(Footer_1["default"], null));
}
exports["default"] = Home;
