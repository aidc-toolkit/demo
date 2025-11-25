import {
    ContentCharacterSets,
    type GTINValidator,
    type IdentifierValidation,
    type IdentifierValidator,
    type NonNumericIdentifierValidation,
    type PrefixType,
    PrefixTypes
} from "@aidc-toolkit/gs1";
import { Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { type ExclusionData, ExclusionInput } from "../string/ExclusionInput.tsx";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.tsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";

/**
 * Determine if object is record of identifier validators.
 *
 * @param validatorOrValidators
 * Validator or validators.
 *
 * @param prefixType
 * Prefix type.
 *
 * @returns
 * True if object is record of identifier validators.
 */
function isValidatorRecord<TIdentifierValidator extends IdentifierValidator>(validatorOrValidators: Record<PrefixType, GTINValidator & TIdentifierValidator> | TIdentifierValidator, prefixType: PrefixType): validatorOrValidators is Record<PrefixType, GTINValidator & TIdentifierValidator> {
    return prefixType in validatorOrValidators;
}

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
 * Identifier validator.
 */
function getValidator<TIdentifierValidator extends IdentifierValidator>(validatorOrValidators: Record<PrefixType, GTINValidator & TIdentifierValidator> | TIdentifierValidator, prefixType: PrefixType): TIdentifierValidator {
    return isValidatorRecord(validatorOrValidators, prefixType) ? validatorOrValidators[prefixType] : validatorOrValidators;
}

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData & IdentifierData & ExclusionData<Exclusion.None | Exclusion.AllNumeric>;

/**
 * Validate identifier form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateForm(properties: FormProperties): ReactElement {
    const isNumeric = getValidator(properties.validatorOrValidators, PrefixTypes.GS1CompanyPrefix).referenceCharacterSet === ContentCharacterSets.Numeric;

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Checkmark and identifier.
     */
    function onProcess(formData: FormData): string {
        const validation: IdentifierValidation | NonNumericIdentifierValidation = isNumeric ?
            {} :
            {
                exclusion: formData.exclusion
            };

        getValidator(properties.validatorOrValidators, formData.prefixType).validate(formData.identifier, validation);

        return `✓ ${formData.identifier}`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <PrefixTypeAndPrefixInput
            identifierType={properties.identifierType}
            excludePrefix={true}
        />
        <IdentifierInput
            identifierType={properties.identifierType}
        />
        <ExclusionInput
            hint={i18nextDemo.t("GS1.exclusionHint")}
            exclusionSupport={isNumeric ? [Exclusion.None] : [Exclusion.None, Exclusion.AllNumeric]}
        />
    </BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
