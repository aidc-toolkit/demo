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
import * as String from "../string/String.tsx";
import * as IdentificationKey from "./IdentificationKey.tsx";

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
export function ValidateForm(properties: IdentificationKey.FormProperties): ReactElement {
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

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <IdentificationKey.PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            isValidate={true}
            prefixType={{
                onProcess: (inputValue) => {
                    prefixType = inputValue;
                }
            }}
        />
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={properties.identificationKeyType}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
        <String.ExclusionInput
            hint={i18nextDemo.t("GS1.exclusionHint")}
            exclusionSupport={isNumeric ? [Exclusion.None] : [Exclusion.None, Exclusion.AllNumeric]}
            onProcess={(inputValue) => {
                exclusion = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
