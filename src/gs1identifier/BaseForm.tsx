import type {
    IdentifierType,
    IdentifierTypeCreator,
    IdentifierValidatorsEntry,
    PrefixManager
} from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { BaseForm as DemoBaseForm, type FormProperties as DemoFormProperties } from "../BaseForm";

/**
 * Form properties. All identifier forms require these properties to be set.
 */
export interface FormProperties<TIdentifierType extends IdentifierType> {
    /**
     * Identifier type.
     */
    readonly identifierType: TIdentifierType;

    /**
     * Validators (GTIN) or validator (non-GTIN).
     */
    readonly validatorsOrValidator: IdentifierValidatorsEntry<TIdentifierType>;

    /**
     * Get creator from prefix manager.
     *
     * @param prefixManager
     * Prefix manager.
     *
     * @returns
     * Identifier creator.
     */
    readonly getCreator: (prefixManager: PrefixManager) => IdentifierTypeCreator<TIdentifierType>;
}

/**
 * Base form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BaseForm<TFormData extends object, TIdentifierType extends IdentifierType>(properties: DemoFormProperties<TFormData> & FormProperties<TIdentifierType>): ReactElement {
    return <DemoBaseForm
        {...properties}
        title={properties.identifierType}
    />;
}
