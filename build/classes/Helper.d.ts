export default class Helper {
    /**
     * Formats a time string to specific format.
     *
     * @param time Time string to be parsed
     * @param format Outpu format
     */
    formatTime(time: string, format?: string): string | undefined;
    /**
     * Formats a number to comma seperated string.
     *
     * @param num Number to be formatted
     */
    formatNumber(num: Number | string): string;
    /**
     * Rounds a number to fixed precision and formats the
     * string to have comma separator.
     *
     * @param num Number to be formatted
     * @param decimal Precision to keep
     */
    roundFormat(num: any, decimal?: Number): any;
    /**
     * Checks if the object contains a key
     *
     * @param propName
     * @param source
     */
    has(propName: any, source: object): any;
    /**
     * Finds an element from the object or array if it exists
     * or returns an empty string
     *
     * @param field
     * @param source
     */
    get(field: any, source: object): any;
    /**
     * Gets a new object keeping only the necessary
     * keys.
     *
     * @param obj  Source object
     * @param keys Keys to keep in an array
     */
    keepOnly(obj: Object, keys: string[]): {
        [key: string]: any;
    };
    /**
     * Removes trailing slashes from the url
     *
     * @param url Url to be cleaned of any trailing slashes
     */
    cleanPath(url: string): string;
    /**
     * Removes html tags from string
     *
     * @param text
     */
    removeHtmlTags(text: string): string;
}
