import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";

/**
 * Form descriptor.
 */
export interface FormDescriptor<T extends object> {
    /**
     * Form resource name.
     */
    readonly resourceName: ParseKeys;

    /**
     * Form.
     *
     * @param properties
     * Properties.
     *
     * @returns
     * React element.
     */
    (properties: T): ReactElement;
}

/**
 * Form group descriptor.
 */
export interface FormGroupDescriptor<T extends object> {
    /**
     * Form properties.
     */
    readonly formProperties: T;

    /**
     * Array of form descriptor or null. If null, a separator line is rendered in the menu.
     */
    readonly FormDescriptors: ReadonlyArray<FormDescriptor<T> | null>;
}
