import { type GTINLevel, GTINLevels, GTINValidator, IdentifierTypes } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { RadioInput } from "../RadioInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.tsx";

/**
 * Form data.
 */
interface FormData extends IdentifierData {
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
    const gtinLevelNames = [i18nextDemo.t("GS1.levelAnyLabel"), i18nextDemo.t("GS1.levelRetailConsumerLabel"), i18nextDemo.t("GS1.levelOtherThanRetailConsumerLabel")] as const;

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
            label={i18nextDemo.t("GS1.levelLabel")}
            hint={i18nextDemo.t("GS1.levelHint")}
            type="number"
            values={[GTINLevels.Any, GTINLevels.RetailConsumer, GTINLevels.OtherThanRetailConsumer]}
            names={[
                i18nextDemo.t("GS1.levelAnyLabel"),
                i18nextDemo.t("GS1.levelRetailConsumerLabel"),
                i18nextDemo.t("GS1.levelOtherThanRetailConsumerLabel")
            ]}
        />
    </BaseForm>;
}

GTINValidateAnyForm.resourceName = "GS1.validateAnySubtitle" as ParseKeys;
