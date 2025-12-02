import {
    ContentCharacterSets, type GTINValidator,
    type IdentifierCreator,
    type IdentifierType,
    type IdentifierValidation,
    type IdentifierValidator,
    type NonNumericIdentifierValidation,
    type NumericIdentifierValidation,
    type PrefixType,
    PrefixTypes
} from "@aidc-toolkit/gs1";
import { Exclusions } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { type ExclusionData, ExclusionInput } from "../string/ExclusionInput";
import { BaseForm, type FormProperties } from "./BaseForm";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput";

/**
 * Get the validator, optionally by prefix type if in an array.
 *
 * @param validatorsOrValidator
 * Validators or validator.
 *
 * @param prefixType
 * Prefix type.
 *
 * @returns
 * Identifier validator.
 */
function getValidator<TIdentifierType extends IdentifierType, TIdentifierValidation extends IdentifierValidation, TIdentifierValidator extends IdentifierValidator<TIdentifierType, TIdentifierValidation>>(validatorsOrValidator: TIdentifierValidator extends GTINValidator ? Record<PrefixType, TIdentifierValidator> : TIdentifierValidator, prefixType: PrefixType): TIdentifierValidator {
    let validator: TIdentifierValidator;

    if (prefixType in validatorsOrValidator) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type is determined by presence of prefixType as key.
        validator = (validatorsOrValidator as Record<PrefixType, GTINValidator & TIdentifierValidator>)[prefixType];
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type is determined by presence of prefixType as key.
        validator = validatorsOrValidator as TIdentifierValidator;
    }

    return validator;
}

/**
 * Form data.
 */
type FormData<TIdentifierType extends IdentifierType> = PrefixTypeAndPrefixData & IdentifierData<TIdentifierType> & ExclusionData<typeof Exclusions.None | typeof Exclusions.AllNumeric>;

/**
 * Validate identifier form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateForm<TIdentifierType extends IdentifierType, TIdentifierValidation extends IdentifierValidation, TIdentifierValidator extends IdentifierValidator<TIdentifierType, TIdentifierValidation>, TIdentifierCreator extends TIdentifierValidator & IdentifierCreator<TIdentifierType, TIdentifierValidation>>(properties: FormProperties<TIdentifierType, TIdentifierValidation, TIdentifierValidator, TIdentifierCreator>): ReactElement {
    const isNumeric = getValidator(properties.validatorsOrValidator, PrefixTypes.GS1CompanyPrefix).referenceCharacterSet === ContentCharacterSets.Numeric;

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Checkmark and identifier.
     */
    function onProcess(formData: FormData<TIdentifierType>): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type is determined by isNumeric.
        const validation = (isNumeric ?
            {} satisfies NumericIdentifierValidation :
            {
                exclusion: formData.exclusion
            } satisfies NonNumericIdentifierValidation) as TIdentifierValidation;

        getValidator(properties.validatorsOrValidator, formData.prefixType).validate(formData.identifier, validation);

        return `✓ ${formData.identifier}`;
    }

    return <BaseForm<FormData<TIdentifierType>, TIdentifierType, TIdentifierValidation, TIdentifierValidator, TIdentifierCreator>
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
            exclusionSupport={isNumeric ? [Exclusions.None] : [Exclusions.None, Exclusions.AllNumeric]}
        />
    </BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
