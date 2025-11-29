import type {
    GTINValidator,
    IdentifierCreator,
    IdentifierType,
    IdentifierValidator,
    PrefixManager,
    PrefixType
} from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { BaseForm as DemoBaseForm, type FormProperties as DemoFormProperties } from "../BaseForm";

/**
 * Form properties. All identifier forms require these properties to be set.
 */
export interface FormProperties<TIdentifierValidator extends IdentifierValidator = IdentifierValidator, TIdentifierCreator extends TIdentifierValidator & IdentifierCreator = TIdentifierValidator & IdentifierCreator> {
    /**
     * Identifier type.
     */
    readonly identifierType: IdentifierType;

    /**
     * Validators (GTIN) or validator (non-GTIN).
     */
    readonly validatorOrValidators: TIdentifierValidator extends GTINValidator ? Record<PrefixType, TIdentifierValidator> : TIdentifierValidator;

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
export function BaseForm<TFormData extends object, TIdentifierValidator extends IdentifierValidator, TIdentifierCreator extends TIdentifierValidator & IdentifierCreator>(properties: DemoFormProperties<TFormData> & FormProperties<TIdentifierValidator, TIdentifierCreator>): ReactElement {
    return <DemoBaseForm
        {...properties}
        title={properties.identifierType}
    />;
}
