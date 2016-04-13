/**
 * is.ts 0.8.10
 * Author: Aras Atasaygin https://github.com/arasatasaygin/is.js
 * Author of fork: Evgeny Labutin https://github.com/LabEG/is.js
 *
 * PS: The library is strive to be light and fast. So she uses the latest standart ES5.
 * But old browsers don't support the ES5 standard. And therefore, such functions as is.array,
 * is.every and others will not work in old browsers. If you need enable support for old browsers
 * you need enable polyfills in your project. This is the most rational way of using resources, speed and memory.
 *
 */
"use strict";
// Baseline
/* -------------------------------------------------------------------------- */
/**
 * @description
 * Light library for chek types in runtime
 *
 * @export
 * @class Is
 */
var Is = (function () {
    function Is() {
        this.VERSION = "0.8.10";
        this.days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.months = [
            "january", "february", "march",
            "april", "may", "june",
            "july", "august", "september",
            "october", "november", "december"
        ];
        // store navigator properties to use later
        this.userAgent = "navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase() || "";
        this.vendor = "navigator" in window && "vendor" in navigator && navigator.vendor.toLowerCase() || "";
        this.appVersion = "navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase() || "";
        // eppPhone match extensible provisioning protocol format
        // nanpPhone match north american number plan format
        // dateString match m/d/yy and mm/dd/yyyy,
        // allowing any combination of one or two digits for the day and month, and two or four digits for the year
        // time match hours, minutes, and seconds, 24-hour clock
        this.regexps = {
            url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
            alphaNumeric: /^[A-Za-z0-9]+$/,
            timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
            dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
            usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
            caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
            ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
            nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
            socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
            affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
            hexadecimal: /^[0-9a-fA-F]+$/,
            hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
            ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
            ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
            ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
        };
    }
    // Type checks
    /* -------------------------------------------------------------------------- */
    // is a given value Arguments?
    Is.prototype.arguments = function (value) {
        return !this.null(value) && (toString.call(value) === "[object Arguments]" || (typeof value === "object" && "callee" in value));
    };
    ;
    /**
     * @description Is a given value Array?
     *
     * Valid:
     * [], [1, "test", null, void 0]
     *
     * Invalid:
     * "test", 5, null, void 0, {test: 5}
     *
     *
     * @param {Array<any>} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.array = function (value) {
        return Array.isArray(value);
    };
    ;
    /**
     * @description Is a given value Array or Null?
     *
     * Valid:
     * [], null, [1, "test", null, void 0]
     *
     * Invalid:
     * "test", 5, , void 0, {test: 5}
     *
     *
     * @param {Array<any>} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.arrayOrNull = function (value) {
        return Array.isArray(value) || this.null(value);
    };
    ;
    /**
     * @description Is a given value Boolean?
     *
     * Valid:
     * true, false, Boolean(5), new Boolean("123")
     *
     * Invalid:
     * "test", 5, null, void 0, {test: 5}
     *
     * @param {(boolean | Boolean)} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.boolean = function (value) {
        return typeof value === "boolean" || value instanceof Boolean;
    };
    ;
    /**
     * @description Is a given value Boolean or Null?
     *
     * Valid:
     * true, false, null, Boolean(5), new Boolean("123")
     *
     * Invalid:
     * "test", 5, void 0, {test: 5}
     *
     * @param {(boolean | Boolean)} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.booleanOrNull = function (value) {
        return typeof value === "boolean" || value instanceof Boolean || value === null;
    };
    ;
    /**
     * @description Is a given value Date Object?
     *
     * Valid:
     * new Date()
     *
     * Invalid:
     * "test", 5, null, void 0, {test: 5}
     *
     * @param {Date} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.date = function (value) {
        return value instanceof Date;
    };
    ;
    /**
     * @description Is a given value Date Object or Null?
     *
     * Valid:
     * new Date(), null
     *
     * Invalid:
     * "test", 5, void 0, {test: 5}
     *
     * @param {Date} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.dateOrNull = function (value) {
        return value instanceof Date || this.null(value);
    };
    ;
    // is a given value Error object?
    Is.prototype.error = function (value) {
        return toString.call(value) === "[object Error]";
    };
    ;
    // is a given value Error object or Null?
    Is.prototype.errorOrNull = function (value) {
        return this.error(value) || this.null(value);
    };
    ;
    // is a given value function?
    Is.prototype.function = function (value) {
        return toString.call(value) === "[object Function]" || typeof value === "function";
    };
    ;
    // is a given value function object or Null?
    Is.prototype.functionOrNull = function (value) {
        return this.function(value) || this.null(value);
    };
    ;
    // is a given value NaN?
    Is.prototype.nan = function (value) {
        return !this.number(value);
    };
    ;
    // is a given value NaN or Null?
    Is.prototype.nanOrNull = function (value) {
        return this.nan(value) || this.null(value);
    };
    ;
    /**
     * @description Is a given value null?
     *
     * Valid:
     * null
     *
     * Invalid:
     * "test", 5, {test: 5}, void 0
     *
     *
     * @param {*} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.null = function (value) {
        return value === null;
    };
    ;
    /**
     * @description Is a given value number?
     *
     * Valid:
     * 5, 0.1, Number(5), new Number(5)
     *
     * Invalid:
     * "5", null, NaN
     *
     *
     * @param {number | Number} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.number = function (value) {
        return (typeof value === "number" || value instanceof Number) && !isNaN(value);
    };
    ;
    /**
     * @description Is a given value number or null?
     *
     * Valid:
     * 5, null, 0.1, Number(5), new Number(5)
     *
     * Invalid:
     * "5", NaN
     *
     *
     * @param {number | Number} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.numberOrNull = function (value) {
        return (typeof value === "number" || value instanceof Number) && !isNaN(value) || value === null;
    };
    ;
    // is a given value object?
    Is.prototype.object = function (value) {
        var type = typeof value;
        return type === "function" || type === "object" && !!value;
    };
    ;
    // is a given value object?
    Is.prototype.objectOrNull = function (value) {
        return this.object(value) || value === null;
    };
    ;
    // is given value a pure JSON object?
    Is.prototype.json = function (value) {
        return toString.call(value) === "[object Object]";
    };
    ;
    // is given value a pure JSON object?
    Is.prototype.jsonOrNull = function (value) {
        return this.json(value) || value === null;
    };
    ;
    // is a given value RegExp?
    Is.prototype.regexp = function (value) {
        return toString.call(value) === "[object RegExp]";
    };
    ;
    // is a given value RegExp?
    Is.prototype.regexpOrNull = function (value) {
        return this.regexp(value) || value === null;
    };
    ;
    // are given values same type?
    // prevent NaN, Number same type check
    Is.prototype.sameType = function (value1, value2) {
        if (this.nan(value1) || this.nan(value2)) {
            return this.nan(value1) === this.nan(value2);
        }
        return toString.call(value1) === toString.call(value2);
    };
    ;
    /**
     * @description Is a given value String?
     *
     * Valid:
     * "text", "123", String("text"), new String("text")
     *
     * Invalid:
     * 5, null, void 0
     *
     *
     * @param {string | String} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.string = function (value) {
        return typeof value === "string" || value instanceof String;
    };
    ;
    /**
     * @description Is a given value String or Null?
     *
     * Valid:
     * "text", null, "123", String("text"), new String("text")
     *
     * Invalid:
     * 5, void 0
     *
     *
     * @param {string | String} value Value for check
     * @returns {boolean} Result of check
     */
    Is.prototype.stringOrNull = function (value) {
        return typeof value === "string" || value instanceof String || value === null;
    };
    ;
    // is a given value Char?
    Is.prototype.char = function (value) {
        return this.string(value) && value.length === 1;
    };
    ;
    // is a given value Char?
    Is.prototype.charOrNull = function (value) {
        return this.char(value) || value === null;
    };
    ;
    // Presence checks
    /* -------------------------------------------------------------------------- */
    // is a given value empty? Objects, arrays, strings
    Is.prototype.empty = function (value) {
        if (this.object(value)) {
            var num = Object.getOwnPropertyNames(value).length;
            if (num === 0 || (num === 1 && this.array(value)) || (num === 2 && this.arguments(value))) {
                return true;
            }
            return false;
        }
        else {
            return value === "";
        }
    };
    ;
    // is a given value not undefined?
    Is.prototype.defined = function (value) {
        return value !== void 0;
    };
    ;
    // is a given value undefined?
    Is.prototype.undefined = function (value) {
        return value === void 0;
    };
    ;
    // is a given value existy?
    Is.prototype.existy = function (value) {
        return value !== null && value !== undefined;
    };
    ;
    // is a given value truthy?
    Is.prototype.truthy = function (value) {
        return this.existy(value) && value !== false && !this.nan(value) && value !== "" && value !== 0;
    };
    ;
    // is a given value falsy?
    Is.prototype.falsy = function (value) {
        return this.truthy(value);
    };
    ;
    // is a given value space?
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    Is.prototype.space = function (value) {
        if (this.char(value)) {
            var characterCode = value.charCodeAt(0);
            return (characterCode > 8 && characterCode < 14) || characterCode === 32;
        }
        else {
            return false;
        }
    };
    ;
    // Arithmetic checks
    /* -------------------------------------------------------------------------- */
    // are given values equal? supports numbers, strings, regexps, booleans
    // TODO: Add object and array support
    Is.prototype.equal = function (value1, value2) {
        return JSON.stringify(value1) === JSON.stringify(value2);
        // check 0 and -0 equity with Infinity and -Infinity
        /*if (this.all.number(value1, value2)) {
            return value1 === value2 && 1 / value1 === 1 / value2;
        }
        // check regexps as strings too
        if (this.all.string(value1, value2) || this.all.regexp(value1, value2)) {
            return "" + value1 === "" + value2;
        }
        if (this.all.boolean(value1, value2)) {
            return value1 === value2;
        }
        return false;*/
    };
    ;
    // is a given number even?
    Is.prototype.even = function (numb) {
        return this.number(numb) && numb % 2 === 0;
    };
    ;
    // is a given number odd?
    Is.prototype.odd = function (numb) {
        return this.number(numb) && numb % 2 === 1;
    };
    ;
    // is a given number positive?
    Is.prototype.positive = function (numb) {
        return this.number(numb) && numb > 0;
    };
    ;
    // is a given number negative?
    Is.prototype.negative = function (numb) {
        return this.number(numb) && numb < 0;
    };
    ;
    // is a given number above minimum parameter?
    Is.prototype.above = function (numb, min) {
        return this.number(numb) && this.number(min) && numb > min;
    };
    ;
    // is a given number above maximum parameter?
    Is.prototype.under = function (numb, max) {
        return this.number(numb) && this.number(max) && numb < max;
    };
    ;
    // is a given number within minimum and maximum parameters?
    Is.prototype.within = function (numb, min, max) {
        return this.number(numb) && this.number(min) && this.number(max) && numb > min && numb < max;
    };
    ;
    // is a given number decimal?
    Is.prototype.decimal = function (numb) {
        return this.number(numb) && numb % 1 !== 0;
    };
    ;
    // is a given number integer?
    Is.prototype.integer = function (numb) {
        return this.number(numb) && numb % 1 === 0;
    };
    ;
    // is a given number finite?
    Is.prototype.finite = function (numb) {
        return isFinite ? isFinite(numb) : numb !== Infinity && numb !== -Infinity && !this.nan(numb);
    };
    ;
    // is a given number infinite?
    Is.prototype.infinite = function (numb) {
        return this.finite(numb);
    };
    ;
    // Regexp checks
    /* -------------------------------------------------------------------------- */
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation
    Is.prototype.url = function (value) {
        return this.regexps.url.test(value);
    };
    Is.prototype.email = function (value) {
        return this.regexps.email.test(value);
    };
    Is.prototype.creditCard = function (value) {
        return this.regexps.creditCard.test(value);
    };
    Is.prototype.alphaNumeric = function (value) {
        return this.regexps.alphaNumeric.test(value);
    };
    Is.prototype.timeString = function (value) {
        return this.regexps.timeString.test(value);
    };
    Is.prototype.dateString = function (value) {
        return this.regexps.dateString.test(value);
    };
    Is.prototype.usZipCode = function (value) {
        return this.regexps.usZipCode.test(value);
    };
    Is.prototype.caPostalCode = function (value) {
        return this.regexps.caPostalCode.test(value);
    };
    Is.prototype.ukPostCode = function (value) {
        return this.regexps.ukPostCode.test(value);
    };
    Is.prototype.nanpPhone = function (value) {
        return this.regexps.nanpPhone.test(value);
    };
    Is.prototype.eppPhone = function (value) {
        return this.regexps.eppPhone.test(value);
    };
    Is.prototype.socialSecurityNumber = function (value) {
        return this.regexps.socialSecurityNumber.test(value);
    };
    Is.prototype.affirmative = function (value) {
        return this.regexps.affirmative.test(value);
    };
    Is.prototype.hexadecimal = function (value) {
        return this.regexps.hexadecimal.test(value);
    };
    Is.prototype.hexColor = function (value) {
        return this.regexps.hexColor.test(value);
    };
    Is.prototype.ipv4 = function (value) {
        return this.regexps.ipv4.test(value);
    };
    Is.prototype.ipv6 = function (value) {
        return this.regexps.ipv6.test(value);
    };
    Is.prototype.ip = function (value) {
        return this.regexps.nanpPhone.test(value);
    };
    // String checks
    /* -------------------------------------------------------------------------- */
    // is a given string include parameter substring?
    Is.prototype.include = function (str, substr) {
        return str.indexOf(substr) > -1;
    };
    ;
    // is a given string all uppercase?
    Is.prototype.upperCase = function (str) {
        return this.string(str) && str === str.toUpperCase();
    };
    ;
    // is a given string all lowercase?
    Is.prototype.lowerCase = function (str) {
        return this.string(str) && str === str.toLowerCase();
    };
    ;
    // is string start with a given startWith parameter?
    Is.prototype.startWith = function (str, startWith) {
        return this.string(str) && str.indexOf(startWith) === 0;
    };
    ;
    // is string end with a given endWith parameter?
    Is.prototype.endWith = function (str, endWith) {
        return this.string(str) && str.indexOf(endWith) > -1 && str.indexOf(endWith) === str.length - endWith.length;
    };
    ;
    // is a given string or sentence capitalized?
    Is.prototype.capitalized = function (str) {
        if (!this.string(str)) {
            return false;
        }
        var words = str.split(" ");
        var capitalized = [];
        for (var i = 0; i < words.length; i++) {
            capitalized.push(words[i][0] === words[i][0].toUpperCase());
        }
        return this.truthy.apply(null, capitalized);
    };
    ;
    // is a given string palindrome?
    Is.prototype.palindrome = function (str) {
        return this.string(str) && str === str.split("").reverse().join("");
    };
    ;
    // Time checks
    /* -------------------------------------------------------------------------- */
    // is a given date indicate today?
    Is.prototype.today = function (obj) {
        var now = new Date();
        var todayString = now.toDateString();
        return this.date(obj) && obj.toDateString() === todayString;
    };
    ;
    // is a given date indicate yesterday?
    Is.prototype.yesterday = function (obj) {
        var now = new Date();
        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return this.date(obj) && obj.toDateString() === yesterdayString;
    };
    ;
    // is a given date indicate tomorrow?
    Is.prototype.tomorrow = function (obj) {
        var now = new Date();
        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
        return this.date(obj) && obj.toDateString() === tomorrowString;
    };
    ;
    // is a given date past?
    Is.prototype.past = function (obj) {
        var now = new Date();
        return this.date(obj) && obj.getTime() < now.getTime();
    };
    ;
    // is a given date future?
    Is.prototype.future = function (obj) {
        return this.past(obj);
    };
    // is a given dates day equal given dayString parameter?
    Is.prototype.day = function (obj, dayString) {
        return this.date(obj) && dayString.toLowerCase() === this.days[obj.getDay()];
    };
    ;
    // is a given dates month equal given monthString parameter?
    Is.prototype.month = function (obj, monthString) {
        return this.date(obj) && monthString.toLowerCase() === this.months[obj.getMonth()];
    };
    ;
    // is a given dates year equal given year parameter?
    Is.prototype.year = function (obj, year) {
        return this.date(obj) && this.number(year) && year === obj.getFullYear();
    };
    ;
    // is the given year a leap year?
    Is.prototype.leapYear = function (year) {
        return this.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };
    ;
    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    Is.prototype.weekend = function (obj) {
        return this.date(obj) && (obj.getDay() === 6 || obj.getDay() === 0);
    };
    ;
    // is a given date weekday?
    Is.prototype.weekday = function (obj) {
        return this.weekend(obj);
    };
    ;
    // is date within given range?
    Is.prototype.inDateRange = function (obj, startObj, endObj) {
        if (!this.date(obj) || !this.date(startObj) || !this.date(endObj)) {
            return false;
        }
        var givenDate = obj.getTime();
        var start = startObj.getTime();
        var end = endObj.getTime();
        return givenDate > start && givenDate < end;
    };
    ;
    // is a given date in last week range?
    Is.prototype.inLastWeek = function (obj) {
        return this.inDateRange(obj, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };
    ;
    // is a given date in last month range?
    Is.prototype.inLastMonth = function (obj) {
        return this.inDateRange(obj, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };
    ;
    // is a given date in last year range?
    Is.prototype.inLastYear = function (obj) {
        return this.inDateRange(obj, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };
    ;
    // is a given date in next week range?
    Is.prototype.inNextWeek = function (obj) {
        return this.inDateRange(obj, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };
    ;
    // is a given date in next month range?
    Is.prototype.inNextMonth = function (obj) {
        return this.inDateRange(obj, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };
    ;
    // is a given date in next year range?
    Is.prototype.inNextYear = function (obj) {
        return this.inDateRange(obj, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };
    ;
    // is a given date in the parameter quarter?
    Is.prototype.quarterOfYear = function (obj, quarterNumber) {
        return this.date(obj) && this.number(quarterNumber) && quarterNumber === Math.floor((obj.getMonth() + 3) / 3);
    };
    ;
    // is a given date in daylight saving time?
    Is.prototype.publicdayLightSavingTime = function (obj) {
        var january = new Date(obj.getFullYear(), 0, 1);
        var july = new Date(obj.getFullYear(), 6, 1);
        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
        return obj.getTimezoneOffset() < stdTimezoneOffset;
    };
    ;
    // Environment checks
    /* -------------------------------------------------------------------------- */
    // is current browser chrome?
    Is.prototype.chrome = function () {
        return typeof window !== void 0 ? /chrome|chromium/i.test(this.userAgent) && /google inc/.test(this.vendor) : false;
    };
    ;
    // is current browser firefox?
    Is.prototype.firefox = function () {
        return typeof window !== void 0 ? /firefox/i.test(this.userAgent) : false;
    };
    ;
    // is current browser edge?
    Is.prototype.edge = function () {
        return typeof window !== void 0 ? /edge/i.test(this.userAgent) : false;
    };
    ;
    // is current browser internet explorer?
    // parameter is optional
    Is.prototype.ie = function (version) {
        if (typeof window === void 0) {
            return false;
        }
        if (!version) {
            return /msie/i.test(this.userAgent) || "ActiveXObject" in window;
        }
        if (version >= 11) {
            return "ActiveXObject" in window;
        }
        return new RegExp("msie " + version).test(this.userAgent);
    };
    ;
    // is current browser opera?
    Is.prototype.opera = function () {
        return typeof window !== void 0 ? (/^Opera\//.test(this.userAgent) ||
            /\x20OPR\//.test(this.userAgent)) : false; // Opera 15+
    };
    ;
    // is current browser safari?
    Is.prototype.safari = function () {
        return typeof window !== void 0 ? (/safari/i.test(this.userAgent) && /apple computer/i.test(this.vendor)) : false;
    };
    ;
    // is current device ios?
    Is.prototype.ios = function () {
        return typeof window !== void 0 ? (this.iphone() || this.ipad() || this.ipod()) : false;
    };
    ;
    // is current device iphone?
    Is.prototype.iphone = function () {
        return typeof window !== void 0 ? /iphone/i.test(this.userAgent) : false;
    };
    ;
    // is current device ipad?
    Is.prototype.ipad = function () {
        return typeof window !== void 0 ? /ipad/i.test(this.userAgent) : false;
    };
    ;
    // is current device ipod?
    Is.prototype.ipod = function () {
        return typeof window !== void 0 ? /ipod/i.test(this.userAgent) : false;
    };
    ;
    // is current device android?
    Is.prototype.android = function () {
        return typeof window !== void 0 ? /android/i.test(this.userAgent) : false;
    };
    ;
    // is current device android phone?
    Is.prototype.androidPhone = function () {
        return typeof window !== void 0 ? (/android/i.test(this.userAgent) && /mobile/i.test(this.userAgent)) : false;
    };
    ;
    // is current device android tablet?
    Is.prototype.androidTablet = function () {
        return typeof window !== void 0 ? (/android/i.test(this.userAgent) && !/mobile/i.test(this.userAgent)) : false;
    };
    ;
    // is current device blackberry?
    Is.prototype.blackberry = function () {
        return typeof window !== void 0 ? (/blackberry/i.test(this.userAgent) || /BB10/i.test(this.userAgent)) : false;
    };
    ;
    // is current device desktop?
    Is.prototype.desktop = function () {
        return typeof window !== void 0 ? (!this.mobile() && !this.tablet()) : false;
    };
    ;
    // is current operating system linux?
    Is.prototype.linux = function () {
        return typeof window !== void 0 ? /linux/i.test(this.appVersion) : false;
    };
    ;
    // is current operating system mac?
    Is.prototype.mac = function () {
        return typeof window !== void 0 ? /mac/i.test(this.appVersion) : false;
    };
    ;
    // is current operating system windows?
    Is.prototype.windows = function () {
        return typeof window !== void 0 ? /win/i.test(this.appVersion) : false;
    };
    ;
    // is current device windows phone?
    Is.prototype.windowsPhone = function () {
        return typeof window !== void 0 ? (this.windows() && /phone/i.test(this.userAgent)) : false;
    };
    ;
    // is current device windows tablet?
    Is.prototype.windowsTablet = function () {
        return typeof window !== void 0 ? (this.windows() && !this.windowsPhone() && /touch/i.test(this.userAgent)) : false;
    };
    ;
    // is current device mobile?
    Is.prototype.mobile = function () {
        return typeof window !== void 0 ?
            (this.iphone() || this.ipod() || this.androidPhone() || this.blackberry() || this.windowsPhone()) : false;
    };
    ;
    // is current device tablet?
    Is.prototype.tablet = function () {
        return typeof window !== void 0 ? (this.ipad() || this.androidTablet() || this.windowsTablet()) : false;
    };
    ;
    // is current state online?
    Is.prototype.online = function () {
        return typeof window !== void 0 ? navigator.onLine : false;
    };
    ;
    // is current state offline?
    Is.prototype.offline = function () {
        return typeof window !== void 0 ? !this.online() : false;
    };
    ;
    // is current device supports touch?
    Is.prototype.touchDevice = function () {
        return typeof window !== void 0 ?
            ("ontouchstart" in window || "DocumentTouch" in window) : false; //  && document instanceof DocumentTouch
    };
    ;
    // Object checks
    /* -------------------------------------------------------------------------- */
    // has a given object got parameterized count property?
    Is.prototype.propertyCount = function (obj, count) {
        if (!this.object(obj) || !this.number(count)) {
            return false;
        }
        if (Object.keys) {
            return Object.keys(obj).length === count;
        }
        var properties = [];
        var property;
        for (property in obj) {
            if (window.hasOwnProperty.call(obj, property)) {
                properties.push(property);
            }
        }
        return properties.length === count;
    };
    ;
    // is given object has parameterized property?
    Is.prototype.propertyDefined = function (obj, property) {
        return this.object(obj) && this.string(property) && property in obj;
    };
    ;
    // is a given object window?
    // setInterval method is only available for window object
    Is.prototype.windowObject = function (obj) {
        return typeof obj === "object" && "setInterval" in obj;
    };
    ;
    // is a given object a DOM node?
    Is.prototype.domNode = function (obj) {
        return this.object(obj) && obj.nodeType > 0;
    };
    ;
    // Array checks
    /* -------------------------------------------------------------------------- */
    // is a given item in an array?
    Is.prototype.inArray = function (val, arr) {
        if (!this.array(arr)) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return true;
            }
        }
        return false;
    };
    ;
    // is a given array sorted?
    Is.prototype.sorted = function (arr) {
        if (!this.array(arr)) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    };
    ;
    /**
     * @description Is all elements of array from type?
     *
     * @template T
     * @param {T[]} value Array for checking
     * @param {(value: T) => boolean} callback Element type cheking function
     * @returns {boolean} Result of check
     */
    Is.prototype.every = function (value, callback) {
        return this.array(value) && value.every(callback);
    };
    ;
    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */
    // set optional regexps to methods if you think they suck
    Is.prototype.setRegexp = function (regexp, regexpName) {
        for (var r in this.regexps) {
            if (window.hasOwnProperty.call(this.regexps, r) && (regexpName === r)) {
                this.regexps[r] = regexp;
            }
        }
    };
    ;
    return Is;
}());
exports.Is = Is;
exports.is = new Is();
//# sourceMappingURL=is.js.map