export default class SearchHandler {

    /**
     * Variable to hold the search input.
     */
    public _search: string = "";

    /**
     * Variable to hold the search history.
     * This is responsible for toggling between search icon
     * and clear icon on the search field. 
     * 
     * If search and history is equal, a clear icon has to be
     * shown. When both doesn't match a search icon has to be shown.
     */
    public history: string = "";

    /**
     * Responsible for toggling the searching indicator.
     */
    public _searching: boolean = false;

    /**
     * Getter for search field.
     */
    get search(): string {
        return this._search;
    }

    /**
     * Setter for search field.
     */
    set search(value: string) {
        this._search = value;

        if (value !== this.history) {
            this.history = "";
        }
    }

    /**
     * Getter for searching field.
     */
    get searching(): boolean {
        return this._searching;
    }

    /**
     * Setter for searching field.
     */
    set searching(value: boolean) {
        this._searching = value;
    }

    /**
     * Search handler is associated to a button. Determine
     * what to do when the button is clicked. Perform clearing, if
     * history and search are equal or perform a new search.
     */
    public onButtonHit() {
        if (this.needsClearing())
            return this.clearSearch();
        return this.newSearch();
    }

    /**
     * Check if the search handler needs to be cleared
     * or not. Clearing is required only if history (past search) and 
     * current search terms are equal.
     */
    private needsClearing(): boolean {
        return true == (this.history && (this.history === this.search));
    }

    /**
     * Perform a new search. The actual api data fetch takes place
     * on the component. 
     * 
     * Search has to be performed on the component by watching the 
     * history variable.
     */
    private newSearch() {
        this.history = this.search;
    }

    /**
     * Clear the search and perform a new search with no
     * search value, so that the UI can be reset to its original state.
     */
    private clearSearch() {
        this.search = "";

        this.newSearch();
    }
}