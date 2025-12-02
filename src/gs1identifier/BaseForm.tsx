import type {
    GTINValidator,
    IdentifierCreator,
    IdentifierType,
    IdentifierValidation,
    IdentifierValidator,
    PrefixManager,
    PrefixType
} from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { BaseForm as DemoBaseForm, type FormProperties as DemoFormProperties } from "../BaseForm";

/**
 * Form properties. All identifier forms require these properties to be set.
 */
export interface FormProperties<TIdentifierType extends IdentifierType, TIdentifierValidation extends IdentifierValidation, TIdentifierValidator extends IdentifierValidator<TIdentifierType, TIdentifierValidation>, TIdentifierCreator extends TIdentifierValidator & IdentifierCreator<TIdentifierType, TIdentifierValidation>> {
    /**
     * Identifier type.
     */
    readonly identifierType: IdentifierType;

    /**
     * Validators (GTIN) or validator (non-GTIN).
     */
    readonly validatorsOrValidator: TIdentifierValidator extends GTINValidator ? Record<PrefixType, TIdentifierValidator> : TIdentifierValidator;

    /**
     * Get creator from prefix manager.
     *
     * @param prefixManager
     * Prefix manager.
     *
     * @returns
     * Identifier creator.
     */
    readonly getCreator: (prefixManager: PrefixManager) => TIdentifierCreator;
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
export function BaseForm<TFormData extends object, TIdentifierType extends IdentifierType, TIdentifierValidation extends IdentifierValidation, TIdentifierValidator extends IdentifierValidator<TIdentifierType, TIdentifierValidation>, TIdentifierCreator extends TIdentifierValidator & IdentifierCreator<TIdentifierType, TIdentifierValidation>>(properties: DemoFormProperties<TFormData> & FormProperties<TIdentifierType, TIdentifierValidation, TIdentifierValidator, TIdentifierCreator>): ReactElement {
    return <DemoBaseForm
        {...properties}
        title={properties.identifierType}
    />;
}
