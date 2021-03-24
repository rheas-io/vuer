"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchHandler = /** @class */ (function () {
    function SearchHandler() {
        /**
         * Variable to hold the search input.
         */
        this._search = "";
        /**
         * Variable to hold the search history.
         * This is responsible for toggling between search icon
         * and clear icon on the search field.
         *
         * If search and history is equal, a clear icon has to be
         * shown. When both doesn't match a search icon has to be shown.
         */
        this.history = "";
        /**
         * Responsible for toggling the searching indicator.
         */
        this._searching = false;
    }
    Object.defineProperty(SearchHandler.prototype, "search", {
        /**
         * Getter for search field.
         */
        get: function () {
            return this._search;
        },
        /**
         * Setter for search field.
         */
        set: function (value) {
            this._search = value;
            if (value !== this.history) {
                this.history = "";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchHandler.prototype, "searching", {
        /**
         * Getter for searching field.
         */
        get: function () {
            return this._searching;
        },
        /**
         * Setter for searching field.
         */
        set: function (value) {
            this._searching = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Search handler is associated to a button. Determine
     * what to do when the button is clicked. Perform clearing, if
     * history and search are equal or perform a new search.
     */
    SearchHandler.prototype.onButtonHit = function () {
        if (this.needsClearing())
            return this.clearSearch();
        return this.newSearch();
    };
    /**
     * Check if the search handler needs to be cleared
     * or not. Clearing is required only if history (past search) and
     * current search terms are equal.
     */
    SearchHandler.prototype.needsClearing = function () {
        return true == (this.history && (this.history === this.search));
    };
    /**
     * Perform a new search. The actual api data fetch takes place
     * on the component.
     *
     * Search has to be performed on the component by watching the
     * history variable.
     */
    SearchHandler.prototype.newSearch = function () {
        this.history = this.search;
    };
    /**
     * Clear the search and perform a new search with no
     * search value, so that the UI can be reset to its original state.
     */
    SearchHandler.prototype.clearSearch = function () {
        this.search = "";
        this.newSearch();
    };
    return SearchHandler;
}());
exports.default = SearchHandler;
