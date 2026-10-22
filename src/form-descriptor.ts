import type { ReactElement } from "react";
import type { DemoParseKeys } from "./locale/i18n.js";

/**
 * Form descriptor.
 */
export interface FormDescriptor<T extends object> {
    /**
     * Form resource name.
     */
    readonly resourceName: DemoParseKeys;

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
