import DataHandler from "./DataHandler";
import axios, { AxiosPromise } from "axios";
import RequestCallback from "../ts/RequestCallback";

export default class DataPoster extends DataHandler {

    public submitted: boolean = false;

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
    public formPost(url: string, form_data: object, onSuccess?: RequestCallback, onError?: RequestCallback) {

        this.initSubmit();

        let data = JSON.stringify(form_data);
        let config = { headers: { "Accept": "application/json", "Content-type": "application/json" } };

        this.api_post(url, data, config)
            .then(response => {
                this.onPostSuccess(response, onSuccess);
                this.onCompleted();
            })
            .catch(error => {
                this.onPostError(error, onError);
                this.onCompleted();
            });
    }

    /**
     * Makes an Axios post request. The function can be used alone
     * to not touch the errors and submitted variables.
     * 
     * @param url Axios POST url
     * @param data Post data
     * @param headers Axios request configurations like headers.
     */
    public api_post(url: string, data: object | string, config?: object): AxiosPromise {
        return axios.post(url, data, config);
    }

    /**
     * Resets the errors and initiates the data post
     * request. Varibale submitted is activated so that indication
     * can be shown on the DOM.
     */
    protected initSubmit() {
        this.reset();

        this.submitted = true;
    }

    /**
     * Calls the onSuccess callback. Sends the data send by the server to 
     * the success callback.
     * 
     * @param response 
     * @param onSuccess 
     */
    protected onPostSuccess(response: any, onSuccess?: RequestCallback) {
        try {
            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        } catch (e) { }
    }

    /**
     * Calls the onError callback. Sends the complete "error" response 
     * object to the onError callback (not just error.data)
     * 
     * @param error 
     * @param onError 
     */
    protected onPostError(error: any, onError?: RequestCallback) {
        try {
            this.setError(error);

            if (typeof onError === 'function') {
                onError(error);
            }
        } catch (e) { }
    }

    /**
     * Deactivates the submitted status, on post completes.
     */
    protected onCompleted() {
        this.submitted = false;
    }
}