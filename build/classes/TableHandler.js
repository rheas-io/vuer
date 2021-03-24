"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Helper_1 = __importDefault(require("./Helper"));
var DataFetcher_1 = __importDefault(require("./DataFetcher"));
var TableHandler = /** @class */ (function () {
    function TableHandler(url, router) {
        /**
         * Variable holding all the table data
         */
        this.table_data = [];
        /**
         * Total number of pages on table.
         */
        this.total_pages = 1;
        /**
         * Query elements of the table like sort_key, sort_order,
         * page etc
         */
        this.query = {
            filter: "",
            page: 1,
            search: "",
            sort_on: "",
            sort_order: "",
        };
        this.df = new DataFetcher_1.default(url);
        this.router = router;
    }
    /**
     * Update the query items on route changed and fetches the
     * new table data for the changed query.
     *
     * Watch the $route on component to this method
     */
    TableHandler.prototype.onRouteChanged = function () {
        var query = this.router.currentRoute.query;
        // Iterate through all the route query and set the
        // handler query object.
        for (var key in query) {
            if (query.hasOwnProperty(key)) {
                this.setQuery(key, query[key]);
            }
        }
        // Current page item should be a number. So we 
        // parse the value to integer, if possible or else 
        // set 1 as the current page.
        this.query.page = isNaN(this.query.page) ? 1 : parseInt(this.query.page);
        this.fetchTable();
    };
    /**
     * Performs the async table fetch using the datafetcher
     * object.
     */
    TableHandler.prototype.fetchTable = function () {
        var query = this.getUrlQuery();
        var url = this.df.data_fetch_url + (query ? '?' + query : '');
        this.df.fetchData(url, this.onFetchSuccess);
    };
    /**
     * Updates the table data on fetch success.
     *
     * @param response Async fetch response from server
     */
    TableHandler.prototype.onFetchSuccess = function (response) {
        this.table_data = response.data;
        this.total_pages = response.last_page;
        this.query.page = response.current_page;
    };
    /**
     * Returns the table fetch query string.
     */
    TableHandler.prototype.getUrlQuery = function () {
        var query = [];
        for (var key in this.query) {
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
    };
    /**
     * Sets a query entry
     *
     * @param key Query key
     * @param value Query value
     */
    TableHandler.prototype.setQuery = function (key, value) {
        // Avoid setting null to a query
        if (value == null) {
            value = "";
        }
        this.query[key] = value;
    };
    /**
     * Controls the table page navigation. Navigate to the
     * page based on the argument passed,
     *
     * @param fn_name
     */
    TableHandler.prototype.navButton = function (fn_name) {
        var _this = this;
        var pageControllers;
        pageControllers = {
            previousPage: function () { return _this.navigateToPage(_this.query.page - 1); },
            nextPage: function () { return _this.navigateToPage(_this.query.page + 1); },
            firstPage: function () { return _this.navigateToPage(1); },
            lastPage: function () { return _this.navigateToPage(_this.total_pages); }
        };
        // Check if there is a page controller defined
        // for the fn_name. If not no action has to be done.
        if (!pageControllers[fn_name]) {
            return;
        }
        // Execute the navigation.
        pageControllers[fn_name]();
    };
    /**
     * Loads a page from the page number.
     *
     * @param page The page to load
     */
    TableHandler.prototype.pageSelect = function (page) {
        this.navigateToPage(page);
    };
    /**
     * Navigates the app to the requested page.
     *
     * @param requestedPage Page number
     */
    TableHandler.prototype.navigateToPage = function (requestedPage) {
        if (this.isValidPage(requestedPage)) {
            this.query.page = requestedPage;
            this.pushNewUrl();
        }
    };
    /**
     * Determines if the page requested is a valid one or not.
     *
     * For a page to be valid, it has to be a number greater than 0,
     * less than or equal to the total pages and should not be equal to
     * the cureent page.
     *
     * @param requestedPage The page requested
     */
    TableHandler.prototype.isValidPage = function (requestedPage) {
        if (isNaN(requestedPage)) {
            return false;
        }
        return requestedPage > 0 &&
            requestedPage !== this.query.page &&
            requestedPage <= this.total_pages;
    };
    /**
     * Filters the table by a key. Pushes a new filter
     * url.
     *
     * @param filter_by
     */
    TableHandler.prototype.filter = function (filter_by) {
        this.query.filter = filter_by;
        this.pushNewUrl();
    };
    /**
     * Pushes a new searc url.
     *
     * @param search_term
     */
    TableHandler.prototype.search = function (search_term) {
        this.query.search = search_term;
        this.pushNewUrl();
    };
    /**
     * Pushes new url via the vue-router
     */
    TableHandler.prototype.pushNewUrl = function () {
        var query = this.getUrlQuery();
        var url = new Helper_1.default().cleanPath(this.router.currentRoute.path);
        url += query ? '?' + query : '';
        this.router.push(url);
    };
    /**
     * Each table row would have items by id. So loading them can be
     * easy if the routes follow a structure like /path/:id
     *
     * @param id Loads the table item by id
     */
    TableHandler.prototype.loadItem = function (id) {
        // Id can't be an undefined or null.
        if (id == null)
            return;
        var url = new Helper_1.default().cleanPath(this.router.currentRoute.path);
        this.router.push(url + "/" + id);
    };
    return TableHandler;
}());
exports.default = TableHandler;
