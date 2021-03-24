import DataPoster from "./DataPoster";
import RequestCallback from "../ts/RequestCallback";

export default class UploadHandler extends DataPoster {

    /**
     * Api upload url.
     */
    private upload_url: string;

    /**
     * Api delete url.
     */
    private delete_url: string;

    /**
     * Creates a new Upload handler. A single instance would
     * suffice for the whole application.
     * 
     * @param upload_url 
     * @param delete_url 
     */
    constructor(upload_url?: string, delete_url?: string) {
        super();

        this.upload_url = upload_url || "api/upload";
        this.delete_url = delete_url || "api/file";
    }

    /**
     * Upload the files to server.
     * 
     * @param files event.target.files
     * @param name File name
     * @param onSuccess 
     * @param onError 
     */
    public upload(files: any, name: string, onSuccess?: RequestCallback, onError?: RequestCallback) {

        if (!files || files.length < 1) return false;

        let formData = new FormData();
        // adding upload_name to form data is manadatory.
        // if the uploaded files input name is not found, the server
        // will use "image" as default value and return the urls
        // for "image" input. If the upload name is defined, server will
        // return the urls for the specified input name which can then be
        // used to render specific components on a page where there are 
        // input components taking multiple images.
        formData.append("upload_name", name);
        formData.append(name, files[0], files[0].name);

        let config = {
            headers: { "Accept": "application/json", "Content-type": "multipart/form-data" }
        };

        this.initSubmit();

        this.api_post(this.upload_url, formData, config)
            // Response will have a json data like { name: file_url}
            // The image_url can be rendered on frontend based on the
            // "name" key.
            .then(response => {
                this.onPostSuccess(response);
                this.onCompleted();
            })
            .catch(error => {
                this.onPostError(error, onError);
                this.onCompleted();
            });
    }

    /**
     * Deletes the file from server. Url to the file has to be 
     * submitted along with the request.
     * 
     * @param file_url Url of the file to delete
     * @param onSuccess 
     */
    public delete(file_url: string, onSuccess?: RequestCallback, onError?: RequestCallback) {
        let data = { url: file_url, _method: "DELETE" };

        this.formPost(this.delete_url, data, onSuccess, onError);
    }
}