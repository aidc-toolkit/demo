import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import type { FormGroupDescriptor } from "./form-descriptor.ts";

/**
 * Array of menu item properties or null. If null, a separator line is rendered.
 */
export type MenuItemPropertiesArray<T extends object> =
    ReadonlyArray<MenuItemProperties<T> | null>;

/**
 * Base menu item properties.
 */
interface BaseMenuItemProperties {
    /**
     * Icon.
     */
    readonly icon?: ReactElement;

    /**
     * Title resource name. Either this or title must be provided.
     */
    readonly titleResourceName?: ParseKeys;

    /**
     * Title. Either this or title resource name must be provided.
     */
    readonly title?: string;
}

/**
 * Function menu item properties.
 */
export interface FunctionMenuItemProperties extends BaseMenuItemProperties {
    /**
     * Callback function.
     */
    readonly f: () => void;
}

/**
 * Sub-menu menu item properties.
 */
export interface SubMenuMenuItemProperties<T extends object> extends BaseMenuItemProperties {
    /**
     * Callback function.
     */
    readonly subMenuItems: MenuItemPropertiesArray<T>;
}

/**
 * Form group descriptor menu item properties.
 */
export interface FormGroupDescriptorMenuItemProperties<T extends object> extends BaseMenuItemProperties {
    /**
     * Form group descriptor.
     */
    // Distributed conditional type is necessary to allow mixing of sub-menu types.
    readonly formGroupDescriptor: T extends T ? FormGroupDescriptor<T> : never;
}

/**
 * Menu item properties.
 */
export type MenuItemProperties<T extends object> =
    FunctionMenuItemProperties | SubMenuMenuItemProperties<T> | (T extends T ? FormGroupDescriptorMenuItemProperties<T> : never);
