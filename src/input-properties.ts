import type { PropertyKeys } from "./type.ts";

/**
 * Input properties. Highly specific inputs may pick individual properties.
 */
export interface InputProperties<TFormData extends object, TInput> {
    /**
     * Element name.
     */
    readonly name: PropertyKeys<TFormData, TInput>;

    /**
     * Label.
     */
    readonly label: string;

    /**
     * Hint to user.
     */
    readonly hint: string;
}
