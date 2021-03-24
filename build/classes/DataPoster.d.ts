import DataHandler from "./DataHandler";
import { AxiosPromise } from "axios";
import RequestCallback from "../ts/RequestCallback";
export default class DataPoster extends DataHandler {
    submitted: boolean;
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
    formPost(url: string, form_data: object, onSuccess?: RequestCallback, onError?: RequestCallback): void;
    /**
     * Makes an Axios post request. The function can be used alone
     * to not touch the errors and submitted variables.
     *
     * @param url Axios POST url
     * @param data Post data
     * @param headers Axios request configurations like headers.
     */
    api_post(url: string, data: object | string, config?: object): AxiosPromise;
    /**
     * Resets the errors and initiates the data post
     * request. Varibale submitted is activated so that indication
     * can be shown on the DOM.
     */
    protected initSubmit(): void;
    /**
     * Calls the onSuccess callback. Sends the data send by the server to
     * the success callback.
     *
     * @param response
     * @param onSuccess
     */
    protected onPostSuccess(response: any, onSuccess?: RequestCallback): void;
    /**
     * Calls the onError callback. Sends the complete "error" response
     * object to the onError callback (not just error.data)
     *
     * @param error
     * @param onError
     */
    protected onPostError(error: any, onError?: RequestCallback): void;
    /**
     * Deactivates the submitted status, on post completes.
     */
    protected onCompleted(): void;
}
