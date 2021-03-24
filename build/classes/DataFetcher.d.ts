import DataHandler from './DataHandler';
import RequestCallback from '../ts/RequestCallback';
export default class DataFetcher extends DataHandler {
    /**
     * Url from where the data has to be fetched.
     */
    data_fetch_url: string | undefined;
    /**
     * Indicater to show on frontend if the data is
     * being fetched or not.
     */
    fetching: boolean;
    /**
     * Creates a new DataFetcher handler.
     *
     * @param url Optional url field.
     */
    constructor(url?: string);
    /**
     * Fetches the api data. This method updates the errors and
     * fetching variables which could come handy with DOM rendering.
     *
     * @param url
     * @param onSuccess
     * @param onError
     */
    fetchData(url: string, onSuccess?: RequestCallback, onError?: RequestCallback): void;
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
    private api_get;
    /**
     * Initiates a new data fetch. Errors are reset and the
     * fetching status is activated.
     */
    protected initFetch(): void;
    /**
     * Calls the onSuccess callback. Sends the data send by the server to
     * the success callback.
     *
     * @param response
     * @param onSuccess
     */
    protected onFetchSuccess(response: any, onSuccess?: RequestCallback): void;
    /**
     * Calls the onError callback. Sends the complete "error" response
     * object to the onError callback (not just error.data)
     *
     * @param error
     * @param onError
     */
    protected onFetchError(error: any, onError?: RequestCallback): void;
    /**
     * Deactivates the fetch status, on fetch completes.
     */
    protected onCompleted(): void;
}
