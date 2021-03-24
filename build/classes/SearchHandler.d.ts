export default class SearchHandler {
    /**
     * Variable to hold the search input.
     */
    _search: string;
    /**
     * Variable to hold the search history.
     * This is responsible for toggling between search icon
     * and clear icon on the search field.
     *
     * If search and history is equal, a clear icon has to be
     * shown. When both doesn't match a search icon has to be shown.
     */
    history: string;
    /**
     * Responsible for toggling the searching indicator.
     */
    _searching: boolean;
    /**
     * Getter for search field.
     */
    get search(): string;
    /**
     * Setter for search field.
     */
    set search(value: string);
    /**
     * Getter for searching field.
     */
    get searching(): boolean;
    /**
     * Setter for searching field.
     */
    set searching(value: boolean);
    /**
     * Search handler is associated to a button. Determine
     * what to do when the button is clicked. Perform clearing, if
     * history and search are equal or perform a new search.
     */
    onButtonHit(): void;
    /**
     * Check if the search handler needs to be cleared
     * or not. Clearing is required only if history (past search) and
     * current search terms are equal.
     */
    private needsClearing;
    /**
     * Perform a new search. The actual api data fetch takes place
     * on the component.
     *
     * Search has to be performed on the component by watching the
     * history variable.
     */
    private newSearch;
    /**
     * Clear the search and perform a new search with no
     * search value, so that the UI can be reset to its original state.
     */
    private clearSearch;
}
