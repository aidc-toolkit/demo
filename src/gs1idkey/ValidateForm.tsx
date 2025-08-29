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
import { ExclusionInput } from "../string/ExclusionInput.tsx";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { IdentificationKeyInput } from "./IdentificationKeyInput.tsx";
import { PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";

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
 * Validate identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateForm(properties: FormProperties): ReactElement {
    let prefixType: PrefixType;
    let identificationKey: string;
    let exclusion: Exclusion.None | Exclusion.AllNumeric;

    const isNumeric = getValidator(properties.validatorOrValidators, PrefixType.GS1CompanyPrefix).referenceCharacterSet === ContentCharacterSet.Numeric;

    /**
     * Process the form.
     *
     * @returns
     * Checkmark and identification key.
     */
    function onProcess(): string {
        const validation: IdentificationKeyValidation | NonNumericIdentificationKeyValidation = isNumeric ?
            {} :
            {
                exclusion
            };

        getValidator(properties.validatorOrValidators, prefixType).validate(identificationKey, validation);

        return `✓ ${identificationKey}`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            prefixType={{
                onProcess: (inputValue) => {
                    prefixType = inputValue;
                }
            }}
        />
        <IdentificationKeyInput
            identificationKeyType={properties.identificationKeyType}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
        <ExclusionInput
            hint={i18nextDemo.t("GS1.exclusionHint")}
            exclusionSupport={isNumeric ? [Exclusion.None] : [Exclusion.None, Exclusion.AllNumeric]}
            onProcess={(inputValue) => {
                exclusion = inputValue;
            }}
        />
    </BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
