import { AxiosError } from "axios";

export default class DataHandler {

    public errors: Object = {};

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
    public setError(errors: AxiosError): object | void {
        // Error will have 401 response when the user is 
        // unauthorized. Reload the page, so that the user 
        // will be taken to redirect page to signin

        if (errors.response && errors.response.status === 401) {
            return window.location.reload();
        }

        if (errors.response && errors.response.data) {
            // Laravel sends an errors field and 422 status when
            // the form validation fails. We will set this.errors
            // to the one send by backend and display the errors on
            // frontend.
            if (errors.response.data.hasOwnProperty('errors')) {
                return this.errors = errors.response.data['errors'];
            }

            // Laravel sends a "message" field when there is any 
            // server error. We will use the same for all applications
            // to keep consistency.
            if (errors.response.data.hasOwnProperty('message')) {
                return this.errors = {
                    server_error: errors.response.data['message']
                };
            }
        }
    }

    /**
     * Checks whether the data handler has any errors.
     * 
     * @return boolean
     */
    public hasErrors(): boolean {
        return this.errors && Object.keys(this.errors).length > 0;
    }

    /**
     * Resets the data handler errors.
     */
    public reset() {
        this.errors = {};
    }
}