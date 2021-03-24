import Helper from "./Helper";
import VueRouter from "vue-router";
import DataFetcher from "./DataFetcher";

export default class TableHandler {

    /**
     * Variable holding all the table data
     */
    public table_data: object[] = [];

    /**
     * Total number of pages on table.
     */
    public total_pages: number = 1;

    /**
     * Query elements of the table like sort_key, sort_order,
     * page etc
     */
    public query: { [key: string]: any } = {
        filter: "",
        page: 1,
        search: "",
        sort_on: "",
        sort_order: "",
    };

    /**
     * Datafetcher instance for making asynchronous data
     * fetch requests.
     */
    public df: DataFetcher;

    /**
     * Application router instance.
     */
    public router: VueRouter;

    constructor(url: string, router: VueRouter) {
        this.df = new DataFetcher(url);
        this.router = router;
    }

    /**
     * Update the query items on route changed and fetches the
     * new table data for the changed query.
     * 
     * Watch the $route on component to this method
     */
    public onRouteChanged() {

        let query = this.router.currentRoute.query;

        // Iterate through all the route query and set the
        // handler query object.
        for (let key in query) {
            if (query.hasOwnProperty(key)) {
                this.setQuery(key, query[key]);
            }
        }
        // Current page item should be a number. So we 
        // parse the value to integer, if possible or else 
        // set 1 as the current page.
        this.query.page = isNaN(this.query.page) ? 1 : parseInt(this.query.page);

        this.fetchTable();
    }

    /**
     * Performs the async table fetch using the datafetcher
     * object.
     */
    public fetchTable() {
        let query = this.getUrlQuery();
        let url = this.df.data_fetch_url + (query ? '?' + query : '');

        this.df.fetchData(url, this.onFetchSuccess);
    }

    /**
     * Updates the table data on fetch success.
     * 
     * @param response Async fetch response from server
     */
    private onFetchSuccess(response: any) {
        this.table_data = response.data;
        this.total_pages = response.last_page;
        this.query.page = response.current_page;
    }

    /**
     * Returns the table fetch query string.
     */
    public getUrlQuery(): string {

        let query = [];

        for (let key in this.query) {
            // If key is page and its value is equal to
            // 1, don't add the page query.
            if (key === 'page' && this.query.page === 1) {
                continue;
            }
            if (this.query.hasOwnProperty(key) && null !== this.query[key]) {
                query.push(key + '=' + encodeURIComponent(this.query[key]));
            }
        }
        return query.join('&');
    }

    /**
     * Sets a query entry
     * 
     * @param key Query key
     * @param value Query value
     */
    public setQuery(key: string, value: any) {

        // Avoid setting null to a query
        if (value == null) {
            value = "";
        }
        this.query[key] = value;
    }

    /**
     * Controls the table page navigation. Navigate to the 
     * page based on the argument passed,
     * 
     * @param fn_name 
     */
    public navButton(fn_name: string) {

        let pageControllers: { [key: string]: () => void };

        pageControllers = {
            previousPage: () => this.navigateToPage(this.query.page - 1),
            nextPage: () => this.navigateToPage(this.query.page + 1),
            firstPage: () => this.navigateToPage(1),
            lastPage: () => this.navigateToPage(this.total_pages)
        }
        // Check if there is a page controller defined
        // for the fn_name. If not no action has to be done.
        if (!pageControllers[fn_name]) {
            return;
        }
        // Execute the navigation.
        pageControllers[fn_name]();
    }

    /**
     * Loads a page from the page number.
     * 
     * @param page The page to load
     */
    public pageSelect(page: number) {
        this.navigateToPage(page);
    }

    /**
     * Navigates the app to the requested page.
     * 
     * @param requestedPage Page number
     */
    public navigateToPage(requestedPage: number) {

        if (this.isValidPage(requestedPage)) {
            this.query.page = requestedPage;

            this.pushNewUrl();
        }
    }

    /**
     * Determines if the page requested is a valid one or not. 
     * 
     * For a page to be valid, it has to be a number greater than 0,
     * less than or equal to the total pages and should not be equal to
     * the cureent page.
     * 
     * @param requestedPage The page requested
     */
    public isValidPage(requestedPage: number) {
        if (isNaN(requestedPage)) {
            return false;
        }

        return requestedPage > 0 &&
            requestedPage !== this.query.page &&
            requestedPage <= this.total_pages;
    }

    /**
     * Filters the table by a key. Pushes a new filter
     * url.
     * 
     * @param filter_by 
     */
    public filter(filter_by: string) {
        this.query.filter = filter_by;

        this.pushNewUrl();
    }

    /**
     * Pushes a new searc url.
     * 
     * @param search_term 
     */
    public search(search_term: string) {
        this.query.search = search_term;

        this.pushNewUrl();
    }

    /**
     * Pushes new url via the vue-router
     */
    public pushNewUrl() {
        let query = this.getUrlQuery();
        let url = new Helper().cleanPath(this.router.currentRoute.path);

        url += query ? '?' + query : '';

        this.router.push(url);
    }

    /**
     * Each table row would have items by id. So loading them can be 
     * easy if the routes follow a structure like /path/:id
     * 
     * @param id Loads the table item by id
     */
    public loadItem(id: Number) {
        // Id can't be an undefined or null.
        if (id == null) return;

        let url = new Helper().cleanPath(this.router.currentRoute.path);

        this.router.push(url + "/" + id);
    }
}