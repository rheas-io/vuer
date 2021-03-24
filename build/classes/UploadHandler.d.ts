import DataPoster from "./DataPoster";
import RequestCallback from "../ts/RequestCallback";
export default class UploadHandler extends DataPoster {
    /**
     * Api upload url.
     */
    private upload_url;
    /**
     * Api delete url.
     */
    private delete_url;
    /**
     * Creates a new Upload handler. A single instance would
     * suffice for the whole application.
     *
     * @param upload_url
     * @param delete_url
     */
    constructor(upload_url?: string, delete_url?: string);
    /**
     * Upload the files to server.
     *
     * @param files event.target.files
     * @param name File name
     * @param onSuccess
     * @param onError
     */
    upload(files: any, name: string, onSuccess?: RequestCallback, onError?: RequestCallback): false | undefined;
    /**
     * Deletes the file from server. Url to the file has to be
     * submitted along with the request.
     *
     * @param file_url Url of the file to delete
     * @param onSuccess
     */
    delete(file_url: string, onSuccess?: RequestCallback, onError?: RequestCallback): void;
}
