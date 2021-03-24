import VueRouter from "vue-router";
import DataFetcher from "./DataFetcher";
export default class TableHandler {
    /**
     * Variable holding all the table data
     */
    table_data: object[];
    /**
     * Total number of pages on table.
     */
    total_pages: number;
    /**
     * Query elements of the table like sort_key, sort_order,
     * page etc
     */
    query: {
        [key: string]: any;
    };
    /**
     * Datafetcher instance for making asynchronous data
     * fetch requests.
     */
    df: DataFetcher;
    /**
     * Application router instance.
     */
    router: VueRouter;
    constructor(url: string, router: VueRouter);
    /**
     * Update the query items on route changed and fetches the
     * new table data for the changed query.
     *
     * Watch the $route on component to this method
     */
    onRouteChanged(): void;
    /**
     * Performs the async table fetch using the datafetcher
     * object.
     */
    fetchTable(): void;
    /**
     * Updates the table data on fetch success.
     *
     * @param response Async fetch response from server
     */
    private onFetchSuccess;
    /**
     * Returns the table fetch query string.
     */
    getUrlQuery(): string;
    /**
     * Sets a query entry
     *
     * @param key Query key
     * @param value Query value
     */
    setQuery(key: string, value: any): void;
    /**
     * Controls the table page navigation. Navigate to the
     * page based on the argument passed,
     *
     * @param fn_name
     */
    navButton(fn_name: string): void;
    /**
     * Loads a page from the page number.
     *
     * @param page The page to load
     */
    pageSelect(page: number): void;
    /**
     * Navigates the app to the requested page.
     *
     * @param requestedPage Page number
     */
    navigateToPage(requestedPage: number): void;
    /**
     * Determines if the page requested is a valid one or not.
     *
     * For a page to be valid, it has to be a number greater than 0,
     * less than or equal to the total pages and should not be equal to
     * the cureent page.
     *
     * @param requestedPage The page requested
     */
    isValidPage(requestedPage: number): boolean;
    /**
     * Filters the table by a key. Pushes a new filter
     * url.
     *
     * @param filter_by
     */
    filter(filter_by: string): void;
    /**
     * Pushes a new searc url.
     *
     * @param search_term
     */
    search(search_term: string): void;
    /**
     * Pushes new url via the vue-router
     */
    pushNewUrl(): void;
    /**
     * Each table row would have items by id. So loading them can be
     * easy if the routes follow a structure like /path/:id
     *
     * @param id Loads the table item by id
     */
    loadItem(id: Number): void;
}
