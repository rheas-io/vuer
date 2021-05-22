import DataHandler from './DataHandler';
import axios, { AxiosPromise } from 'axios';
import RequestCallback from '../ts/RequestCallback';

export default class DataFetcher extends DataHandler {
    /**
     * Url from where the data has to be fetched.
     */
    public data_fetch_url: string | undefined;

    /**
     * Indicater to show on frontend if the data is
     * being fetched or not.
     */
    public fetching: boolean = false;

    /**
     * Creates a new DataFetcher handler.
     *
     * @param url Optional url field.
     */
    constructor(url?: string) {
        super();

        this.data_fetch_url = url;
    }

    /**
     * Fetches the api data. This method updates the errors and
     * fetching variables which could come handy with DOM rendering.
     *
     * @param url
     * @param onSuccess
     * @param onError
     * @param params
     * @param headers
     */
    public fetchData(
        url: string,
        onSuccess?: RequestCallback,
        onError?: RequestCallback,
        params?: object,
        header?: object,
    ) {
        this.initFetch();

        this.api_get(url || this.data_fetch_url, params, header)
            .then((response) => {
                this.onFetchSuccess(response, onSuccess);
                this.onCompleted();
            })
            .catch((error) => {
                this.onFetchError(error, onError);
                this.onCompleted();
            });
    }

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
    private api_get(url?: string, params?: object, header?: object): AxiosPromise {
        params = params || {};
        header = header || {};

        return axios({
            method: 'get',
            url,
            params,
            headers: { ...{ 'Cache-Control': 'no-cache' }, ...header },
        });
    }

    /**
     * Initiates a new data fetch. Errors are reset and the
     * fetching status is activated.
     */
    protected initFetch() {
        this.reset();

        this.fetching = true;
    }

    /**
     * Calls the onSuccess callback. Sends the data send by the server to
     * the success callback.
     *
     * @param response
     * @param onSuccess
     */
    protected onFetchSuccess(response: any, onSuccess?: RequestCallback) {
        try {
            if (typeof onSuccess === 'function') {
                onSuccess(response.data, response);
            }
        } catch (e) {}
    }

    /**
     * Calls the onError callback. Sends the complete "error" response
     * object to the onError callback (not just error.data)
     *
     * @param error
     * @param onError
     */
    protected onFetchError(error: any, onError?: RequestCallback) {
        try {
            this.setError(error);

            if (typeof onError === 'function') {
                onError(error);
            }
        } catch (e) {}
    }

    /**
     * Deactivates the fetch status, on fetch completes.
     */
    protected onCompleted() {
        this.fetching = false;
    }
}
