/** Allows interact with the DOM tree */
export interface DomInterface {
    /**
     * Create HTML element
     *
     * @param name - name of HTML element
     */
    createElement(name: string): Nullable<HTMLElement>;

    /**
     * Returns HTML element by ID
     *
     * @param id - ID of HTML element
     */
    getElement(id: string): Nullable<HTMLElement>;

    /**
     * Calls a callback after loading the DOM tree
     *
     * @param callback - function that is called after loading the DOM tree
     */
    afterLoad(callback: () => void): void;
}
