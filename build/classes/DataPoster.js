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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DataHandler_1 = __importDefault(require("./DataHandler"));
var axios_1 = __importDefault(require("axios"));
var DataPoster = /** @class */ (function (_super) {
    __extends(DataPoster, _super);
    function DataPoster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.submitted = false;
        return _this;
    }
    /**
     * Posts data to the url. This method touches the submitted
     * and errors fields, which enables dynamic DOM manipulations.
     * Use this if automatic DOM rendering is required. For eg, in
     * cases where <div v-if="submitted">Loading...</div>
     *
     * @param url Post url
     * @param form_data Post data
     * @param onSuccess Success callback
     * @param onError Error callback
     * @param onStarted Started callback
     * @param onEnded Ended callback
     */
    DataPoster.prototype.formPost = function (url, form_data, onSuccess, onError) {
        var _this = this;
        this.initSubmit();
        var data = JSON.stringify(form_data);
        var config = { headers: { "Accept": "application/json", "Content-type": "application/json" } };
        this.api_post(url, data, config)
            .then(function (response) {
            _this.onPostSuccess(response, onSuccess);
            _this.onCompleted();
        })
            .catch(function (error) {
            _this.onPostError(error, onError);
            _this.onCompleted();
        });
    };
    /**
     * Makes an Axios post request. The function can be used alone
     * to not touch the errors and submitted variables.
     *
     * @param url Axios POST url
     * @param data Post data
     * @param headers Axios request configurations like headers.
     */
    DataPoster.prototype.api_post = function (url, data, config) {
        return axios_1.default.post(url, data, config);
    };
    /**
     * Resets the errors and initiates the data post
     * request. Varibale submitted is activated so that indication
     * can be shown on the DOM.
     */
    DataPoster.prototype.initSubmit = function () {
        this.reset();
        this.submitted = true;
    };
    /**
     * Calls the onSuccess callback. Sends the data send by the server to
     * the success callback.
     *
     * @param response
     * @param onSuccess
     */
    DataPoster.prototype.onPostSuccess = function (response, onSuccess) {
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
    DataPoster.prototype.onPostError = function (error, onError) {
        try {
            this.setError(error);
            if (typeof onError === 'function') {
                onError(error);
            }
        }
        catch (e) { }
    };
    /**
     * Deactivates the submitted status, on post completes.
     */
    DataPoster.prototype.onCompleted = function () {
        this.submitted = false;
    };
    return DataPoster;
}(DataHandler_1.default));
exports.default = DataPoster;
