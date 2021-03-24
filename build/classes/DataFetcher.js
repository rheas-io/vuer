"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var DataHandler_1 = __importDefault(require("./DataHandler"));
var axios_1 = __importDefault(require("axios"));
var DataFetcher = /** @class */ (function (_super) {
    __extends(DataFetcher, _super);
    /**
     * Creates a new DataFetcher handler.
     *
     * @param url Optional url field.
     */
    function DataFetcher(url) {
        var _this = _super.call(this) || this;
        /**
         * Indicater to show on frontend if the data is
         * being fetched or not.
         */
        _this.fetching = false;
        _this.data_fetch_url = url;
        return _this;
    }
    /**
     * Fetches the api data. This method updates the errors and
     * fetching variables which could come handy with DOM rendering.
     *
     * @param url
     * @param onSuccess
     * @param onError
     */
    DataFetcher.prototype.fetchData = function (url, onSuccess, onError) {
        var _this = this;
        this.initFetch();
        this.api_get(url || this.data_fetch_url)
            .then(function (response) {
            _this.onFetchSuccess(response, onSuccess);
            _this.onCompleted();
        })
            .catch(function (error) {
            _this.onFetchError(error, onError);
            _this.onCompleted();
        });
    };
    /**
     * Responsible for handling the network communication via axios.
     * Function can be used if all the DataFetcher functionality like
     * initFetch, onCompleted has to be avoided.
     *
     * This function allows for independant data fetch without affecting
     * the DOM elements (fetching and errors variable remain untouched).
     *
     * Returns a Promise, so can have custom onSuccess and onError
     * functionality.
     *
     * @param url The url from which data has to be fetched.
     * @param header
     */
    DataFetcher.prototype.api_get = function (url, header) {
        header = header || {};
        return axios_1.default({
            method: 'get',
            url: url,
            headers: __assign({ 'Cache-Control': 'no-cache' }, header),
        });
    };
    /**
     * Initiates a new data fetch. Errors are reset and the
     * fetching status is activated.
     */
    DataFetcher.prototype.initFetch = function () {
        this.reset();
        this.fetching = true;
    };
    /**
     * Calls the onSuccess callback. Sends the data send by the server to
     * the success callback.
     *
     * @param response
     * @param onSuccess
     */
    DataFetcher.prototype.onFetchSuccess = function (response, onSuccess) {
        try {
            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        }
        catch (e) { }
    };
    /**
     * Calls the onError callback. Sends the complete "error" response
     * object to the onError callback (not just error.data)
     *
     * @param error
     * @param onError
     */
    DataFetcher.prototype.onFetchError = function (error, onError) {
        try {
            this.setError(error);
            if (typeof onError === 'function') {
                onError(error);
            }
        }
        catch (e) { }
    };
    /**
     * Deactivates the fetch status, on fetch completes.
     */
    DataFetcher.prototype.onCompleted = function () {
        this.fetching = false;
    };
    return DataFetcher;
}(DataHandler_1.default));
exports.default = DataFetcher;
