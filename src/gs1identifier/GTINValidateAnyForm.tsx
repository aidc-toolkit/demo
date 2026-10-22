import { type GTINLevel, GTINLevels, type GTINType, GTINValidator, IdentifierTypes } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { type DemoParseKeys, i18nextDemoT } from "../locale/i18n.js";
import { RadioInput } from "../RadioInput.jsx";
import { BaseForm } from "./BaseForm.jsx";
import type { FormProperties } from "./GTIN.jsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.jsx";

/**
 * Form data.
 */
interface FormData extends IdentifierData<GTINType> {
    /**
     * GTIN level.
     */
    gtinLevel: GTINLevel;
}

/**
 * Validate any GTIN form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTINValidateAnyForm(properties: FormProperties): ReactElement {
    const gtinLevelNames = [i18nextDemoT("GS1.levelAnyLabel"), i18nextDemoT("GS1.levelRetailConsumerLabel"), i18nextDemoT("GS1.levelOtherThanRetailConsumerLabel")] as const;

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     * 
     * @returns
     * Checkmark and identifier and GTIN level.
     */
    function onProcess(formData: FormData): string {
        GTINValidator.validateAny(formData.identifier, formData.gtinLevel);

        return `✓ ${formData.identifier} (${gtinLevelNames[formData.gtinLevel]})`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTINValidateAnyForm.resourceName}
        onProcess={onProcess}
    >
        <IdentifierInput
            identifierType={IdentifierTypes.GTIN}
        />
        <RadioInput
            name="gtinLevel"
            label={i18nextDemoT("GS1.levelLabel")}
            hint={i18nextDemoT("GS1.levelHint")}
            type="number"
            values={[GTINLevels.Any, GTINLevels.RetailConsumer, GTINLevels.OtherThanRetailConsumer]}
            names={[
                i18nextDemoT("GS1.levelAnyLabel"),
                i18nextDemoT("GS1.levelRetailConsumerLabel"),
                i18nextDemoT("GS1.levelOtherThanRetailConsumerLabel")
            ]}
        />
    </BaseForm>;
}

GTINValidateAnyForm.resourceName = "GS1.validateAnySubtitle" as DemoParseKeys;
