import { GTINLevel, GTINValidator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { EnumInput } from "../EnumInput.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";
import { type IdentificationKeyData, IdentificationKeyInput } from "./IdentificationKeyInput.tsx";

/**
 * Form data.
 */
interface FormData extends IdentificationKeyData {
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
    const gtinLevelNames = [i18nextDemo.t("GS1.levelAnyLabel"), i18nextDemo.t("GS1.levelRetailConsumerLabel"), i18nextDemo.t("GS1.levelOtherThanRetailConsumerLabel")];

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     * 
     * @returns
     * Checkmark and identification key and GTIN level.
     */
    function onProcess(formData: FormData): string {
        GTINValidator.validateAny(formData.identificationKey, formData.gtinLevel);

        return `✓ ${formData.identificationKey} (${gtinLevelNames[formData.gtinLevel]})`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTINValidateAnyForm.resourceName}
        onProcess={onProcess}
    >
        <IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
        />
        <EnumInput
            name="gtinLevel"
            label={i18nextDemo.t("GS1.levelLabel")}
            hint={i18nextDemo.t("GS1.levelHint")}
            enumValues={[GTINLevel.Any, GTINLevel.RetailConsumer, GTINLevel.OtherThanRetailConsumer]}
            names={gtinLevelNames}
        />
    </BaseForm>;
}

GTINValidateAnyForm.resourceName = "GS1.validateAnySubtitle" as ParseKeys;
