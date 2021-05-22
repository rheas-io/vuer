export default class Helper {

    /**
     * Formats a number to comma seperated string.
     * 
     * @param num Number to be formatted
     */
    public formatNumber(num: Number | string) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    /**
     * Rounds a number to fixed precision and formats the 
     * string to have comma separator.
     * 
     * @param num Number to be formatted
     * @param decimal Precision to keep
     */
    public roundFormat(num: any, decimal?: Number) {
        try {
            if (num = parseFloat(num)) {
                let fixedNumber = num.toFixed(Number.isInteger(num) ? 0 : (decimal || 2));

                return this.formatNumber(fixedNumber);
            }
        } catch (error) { }

        return num;
    }

    /**
     * Checks if the object contains a key
     * 
     * @param propName 
     * @param source 
     */
    public has(propName: any, source: object) {
        let value = this.get(propName, source);

        return value && value.length > 0;
    }

    /**
     * Finds an element from the object or array if it exists
     * or returns an empty string
     * 
     * @param field 
     * @param source 
     */
    public get(field: any, source: object) {
        let fields = field.split('.');

        return fields.reduce(
            (prev: any, current: any) => (prev && prev[current]) ? prev[current] : "",
            source
        );
    }

    /**
     * Gets a new object keeping only the necessary
     * keys.
     * 
     * @param obj  Source object
     * @param keys Keys to keep in an array
     */
    public keepOnly(obj: Object, keys: string[]) {
        let newObject: { [key: string]: any } = { ...obj, ...{} };

        for (let key in newObject) {
            if (keys.indexOf(key) == -1) {
                delete newObject[key];
            }
        }
        return newObject;
    }

    /**
     * Removes trailing slashes from the url
     * 
     * @param url Url to be cleaned of any trailing slashes
     */
    public cleanPath(url: string) {
        // Remove any trailing slashes from path
        return url.replace(/\/+$/, "");
    }

    /**
     * Removes html tags from string
     * 
     * @param text 
     */
    public removeHtmlTags(text: string) {

        if (!text) return text;

        var tmp = document.createElement("DIV");
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || "";
    }
}