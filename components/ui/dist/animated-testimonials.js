"use client";
"use strict";
exports.__esModule = true;
exports.AnimatedTestimonials = void 0;
var icons_react_1 = require("@tabler/icons-react");
var framer_motion_1 = require("framer-motion");
var image_1 = require("next/image");
var react_1 = require("react");
// Predetermined rotation values for consistent server/client rendering
var ROTATION_PATTERNS = [
    { initial: -8, exit: 8 },
    { initial: 6, exit: -6 },
    { initial: -4, exit: 4 },
    { initial: 7, exit: -7 },
    { initial: -5, exit: 5 },
    { initial: 3, exit: -3 },
    { initial: -9, exit: 9 },
    { initial: 5, exit: -5 },
    { initial: -7, exit: 7 },
    { initial: 4, exit: -4 },
];
exports.AnimatedTestimonials = function (_a) {
    var testimonials = _a.testimonials, _b = _a.autoplay, autoplay = _b === void 0 ? false : _b;
    var _c = react_1.useState(0), active = _c[0], setActive = _c[1];
    var handleNext = function () {
        setActive(function (prev) { return (prev + 1) % testimonials.length; });
    };
    var handlePrev = function () {
        setActive(function (prev) { return (prev - 1 + testimonials.length) % testimonials.length; });
    };
    var isActive = function (index) {
        return index === active;
    };
    react_1.useEffect(function () {
        if (autoplay) {
            var interval_1 = setInterval(handleNext, 5000);
            return function () { return clearInterval(interval_1); };
        }
    }, [autoplay]);
    return (React.createElement("div", { className: "max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20" },
        React.createElement("div", { className: "relative grid grid-cols-1 md:grid-cols-2 gap-20" },
            React.createElement("div", null,
                React.createElement("div", { className: "relative h-80 w-full" },
                    React.createElement(framer_motion_1.AnimatePresence, null, testimonials.map(function (testimonial, index) {
                        var rotationPattern = ROTATION_PATTERNS[index % ROTATION_PATTERNS.length];
                        return (React.createElement(framer_motion_1.motion.div, { key: testimonial.src, initial: {
                                opacity: 0,
                                scale: 0.9,
                                z: -100,
                                rotate: rotationPattern.initial
                            }, animate: {
                                opacity: isActive(index) ? 1 : 0.7,
                                scale: isActive(index) ? 1 : 0.95,
                                z: isActive(index) ? 0 : -100,
                                rotate: isActive(index) ? 0 : rotationPattern.initial,
                                zIndex: isActive(index)
                                    ? 999
                                    : testimonials.length + 2 - index,
                                y: isActive(index) ? [0, -80, 0] : 0
                            }, exit: {
                                opacity: 0,
                                scale: 0.9,
                                z: 100,
                                rotate: rotationPattern.exit
                            }, transition: {
                                duration: 0.4,
                                ease: "easeInOut"
                            }, className: "absolute inset-0 origin-bottom" },
                            React.createElement(image_1["default"], { src: testimonial.src, alt: testimonial.name, width: 500, height: 500, draggable: false, className: "h-full w-full rounded-3xl object-cover object-center" })));
                    })))),
            React.createElement("div", { className: "flex justify-between flex-col py-4" },
                React.createElement(framer_motion_1.motion.div, { key: active, initial: {
                        y: 20,
                        opacity: 0
                    }, animate: {
                        y: 0,
                        opacity: 1
                    }, exit: {
                        y: -20,
                        opacity: 0
                    }, transition: {
                        duration: 0.2,
                        ease: "easeInOut"
                    } },
                    React.createElement("h3", { className: "text-2xl font-bold dark:text-white text-white" }, testimonials[active].name),
                    React.createElement("p", { className: "text-sm text-gray-400 dark:text-neutral-500" }, testimonials[active].designation),
                    React.createElement(framer_motion_1.motion.p, { className: "text-lg text-gray-300 mt-8 dark:text-neutral-300" }, testimonials[active].quote.split(" ").map(function (word, index) { return (React.createElement(framer_motion_1.motion.span, { key: index, initial: {
                            filter: "blur(10px)",
                            opacity: 0,
                            y: 5
                        }, animate: {
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0
                        }, transition: {
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.02 * index
                        }, className: "inline-block" },
                        word,
                        "\u00A0")); }))),
                React.createElement("div", { className: "flex gap-4 pt-12 md:pt-0" },
                    React.createElement("button", { onClick: handlePrev, className: "h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button" },
                        React.createElement(icons_react_1.IconArrowLeft, { className: "h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" })),
                    React.createElement("button", { onClick: handleNext, className: "h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button" },
                        React.createElement(icons_react_1.IconArrowRight, { className: "h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" })))))));
};
