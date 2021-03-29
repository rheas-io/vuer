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
var DataPoster_1 = __importDefault(require("./DataPoster"));
var UploadHandler = /** @class */ (function (_super) {
    __extends(UploadHandler, _super);
    /**
     * Creates a new Upload handler. A single instance would
     * suffice for the whole application.
     *
     * @param upload_url
     * @param delete_url
     */
    function UploadHandler(upload_url, delete_url) {
        var _this = _super.call(this) || this;
        _this.upload_url = upload_url || 'api/upload';
        _this.delete_url = delete_url || 'api/file';
        return _this;
    }
    /**
     * Upload the files to server.
     *
     * @param files event.target.files
     * @param name File name
     * @param onSuccess
     * @param onError
     */
    UploadHandler.prototype.upload = function (files, name, onSuccess, onError) {
        var _this = this;
        if (!files || files.length < 1)
            return false;
        var formData = new FormData();
        // adding upload_name to form data is manadatory.
        // if the uploaded files input name is not found, the server
        // will use "image" as default value and return the urls
        // for "image" input. If the upload name is defined, server will
        // return the urls for the specified input name which can then be
        // used to render specific components on a page where there are
        // input components taking multiple images.
        formData.append('upload_name', name);
        formData.append(name, files[0], files[0].name);
        var config = {
            headers: { Accept: 'application/json', 'Content-type': 'multipart/form-data' },
        };
        this.initSubmit();
        this.api_post(this.upload_url, formData, config)
            // Response will have a json data like { name: file_url}
            // The image_url can be rendered on frontend based on the
            // "name" key.
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
     * Deletes the file from server. Url to the file has to be
     * submitted along with the request.
     *
     * @param file_url Url of the file to delete
     * @param onSuccess
     */
    UploadHandler.prototype.delete = function (file_url, onSuccess, onError) {
        var data = { url: file_url, _method: 'DELETE' };
        this.formPost(this.delete_url, data, onSuccess, onError);
    };
    return UploadHandler;
}(DataPoster_1.default));
exports.default = UploadHandler;
