"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var Helper = /** @class */ (function () {
    function Helper() {
    }
    /**
     * Formats a time string to specific format.
     *
     * @param time Time string to be parsed
     * @param format Outpu format
     */
    Helper.prototype.formatTime = function (time, format) {
        if (!time)
            return;
        return moment_timezone_1.default(time).format(format || "MM/DD/YYYY hh:mm A");
    };
    /**
     * Formats a number to comma seperated string.
     *
     * @param num Number to be formatted
     */
    Helper.prototype.formatNumber = function (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    /**
     * Rounds a number to fixed precision and formats the
     * string to have comma separator.
     *
     * @param num Number to be formatted
     * @param decimal Precision to keep
     */
    Helper.prototype.roundFormat = function (num, decimal) {
        try {
            if (num = parseFloat(num)) {
                var fixedNumber = num.toFixed(Number.isInteger(num) ? 0 : (decimal || 2));
                return this.formatNumber(fixedNumber);
            }
        }
        catch (error) { }
        return num;
    };
    /**
     * Checks if the object contains a key
     *
     * @param propName
     * @param source
     */
    Helper.prototype.has = function (propName, source) {
        var value = this.get(propName, source);
        return value && value.length > 0;
    };
    /**
     * Finds an element from the object or array if it exists
     * or returns an empty string
     *
     * @param field
     * @param source
     */
    Helper.prototype.get = function (field, source) {
        var fields = field.split('.');
        return fields.reduce(function (prev, current) { return (prev && prev[current]) ? prev[current] : ""; }, source);
    };
    /**
     * Gets a new object keeping only the necessary
     * keys.
     *
     * @param obj  Source object
     * @param keys Keys to keep in an array
     */
    Helper.prototype.keepOnly = function (obj, keys) {
        var newObject = __assign(__assign({}, obj), {});
        for (var key in newObject) {
            if (keys.indexOf(key) == -1) {
                delete newObject[key];
            }
        }
        return newObject;
    };
    /**
     * Removes trailing slashes from the url
     *
     * @param url Url to be cleaned of any trailing slashes
     */
    Helper.prototype.cleanPath = function (url) {
        // Remove any trailing slashes from path
        return url.replace(/\/+$/, "");
    };
    /**
     * Removes html tags from string
     *
     * @param text
     */
    Helper.prototype.removeHtmlTags = function (text) {
        if (!text)
            return text;
        var tmp = document.createElement("DIV");
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || "";
    };
    return Helper;
}());
exports.default = Helper;
