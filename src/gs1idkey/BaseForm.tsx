import type {
    GTINValidator,
    IdentificationKeyCreator,
    IdentificationKeyType,
    IdentificationKeyValidator,
    PrefixManager
} from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { BaseForm as DemoBaseForm, type FormProperties as DemoFormProperties } from "../BaseForm.tsx";

/**
 * Form properties. All identification key forms require these properties to be set.
 */
export interface FormProperties<TIdentificationKeyValidator extends IdentificationKeyValidator = IdentificationKeyValidator, TIdentificationKeyCreator extends TIdentificationKeyValidator & IdentificationKeyCreator = TIdentificationKeyValidator & IdentificationKeyCreator> {
    /**
     * Identification key type.
     */
    readonly identificationKeyType: IdentificationKeyType;

    /**
     * Validators (GTIN) or validator (non-GTIN).
     */
    readonly validatorOrValidators: TIdentificationKeyValidator extends GTINValidator ? TIdentificationKeyValidator[] : TIdentificationKeyValidator;

    /**
     * Get creator from prefix manager.
     *
     * @param prefixManager
     * Prefix manager.
     *
     * @returns
     * Identification key creator.
     */
    readonly getCreator: (prefixManager: PrefixManager) => TIdentificationKeyCreator;
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
export function BaseForm<TFormData extends object, TIdentificationKeyValidator extends IdentificationKeyValidator, TIdentificationKeyCreator extends TIdentificationKeyValidator & IdentificationKeyCreator>(properties: DemoFormProperties<TFormData> & FormProperties<TIdentificationKeyValidator, TIdentificationKeyCreator>): ReactElement {
    return <DemoBaseForm
        {...properties}
        title={properties.identificationKeyType}
    />;
}
