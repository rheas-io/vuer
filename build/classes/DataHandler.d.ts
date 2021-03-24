import { AxiosError } from "axios";
export default class DataHandler {
    errors: Object;
    /**
     * Set the data handler error response. The error response
     * are based on the Laravel error response format. A response
     * of 401 reloads the page (which should take the user to login page).
     *
     * If there is an error response (error.response.data is not null),
     * then appropriate error message is shown to the user.
     *
     * @param errors Axios error response
     */
    setError(errors: AxiosError): object | void;
    /**
     * Checks whether the data handler has any errors.
     *
     * @return boolean
     */
    hasErrors(): boolean;
    /**
     * Resets the data handler errors.
     */
    reset(): void;
}
