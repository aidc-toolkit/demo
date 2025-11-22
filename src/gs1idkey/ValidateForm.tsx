import {
    ContentCharacterSet,
    type GTINValidator,
    type IdentificationKeyValidation,
    type IdentificationKeyValidator,
    type NonNumericIdentificationKeyValidation,
    PrefixType
} from "@aidc-toolkit/gs1";
import { Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { type ExclusionData, ExclusionInput } from "../string/ExclusionInput.tsx";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { type IdentificationKeyData, IdentificationKeyInput } from "./IdentificationKeyInput.tsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";

/**
 * Get the validator, optionally by prefix type if in an array.
 *
 * @param validatorOrValidators
 * Validator or validators.
 *
 * @param prefixType
 * Prefix type.
 *
 * @returns
 * Identification key validator.
 */
function getValidator<TIdentificationKeyValidator extends IdentificationKeyValidator>(validatorOrValidators: Array<GTINValidator & TIdentificationKeyValidator> | TIdentificationKeyValidator, prefixType: PrefixType): TIdentificationKeyValidator {
    return !Array.isArray(validatorOrValidators) ? validatorOrValidators : validatorOrValidators[prefixType];
}

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData & IdentificationKeyData & ExclusionData<Exclusion.None | Exclusion.AllNumeric>;

/**
 * Validate identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateForm(properties: FormProperties): ReactElement {
    const isNumeric = getValidator(properties.validatorOrValidators, PrefixType.GS1CompanyPrefix).referenceCharacterSet === ContentCharacterSet.Numeric;

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Checkmark and identification key.
     */
    function onProcess(formData: FormData): string {
        const validation: IdentificationKeyValidation | NonNumericIdentificationKeyValidation = isNumeric ?
            {} :
            {
                exclusion: formData.exclusion
            };

        getValidator(properties.validatorOrValidators, formData.prefixType).validate(formData.identificationKey, validation);

        return `✓ ${formData.identificationKey}`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            excludePrefix={true}
        />
        <IdentificationKeyInput
            identificationKeyType={properties.identificationKeyType}
        />
        <ExclusionInput
            hint={i18nextDemo.t("GS1.exclusionHint")}
            exclusionSupport={isNumeric ? [Exclusion.None] : [Exclusion.None, Exclusion.AllNumeric]}
        />
    </BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
