/**
 * Input properties. Highly specific inputs may pick individual properties.
 */
export interface InputProperties<T extends string | number | boolean | undefined> {
    /**
     * Element name.
     */
    readonly name: string;

    /**
     * Label.
     */
    readonly label: string;

    /**
     * Hint to user.
     */
    readonly hint: string;

    /**
     * Callback to set the value when enclosing form is processed.
     */
    readonly onProcess: (inputValue: T) => void;
}
