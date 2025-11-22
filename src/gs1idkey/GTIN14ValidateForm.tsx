import { GTINValidator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";
import { type IdentificationKeyData, IdentificationKeyInput } from "./IdentificationKeyInput.tsx";

/**
 * Form data.
 */
type FormData = IdentificationKeyData;

/**
 * Validate GTIN-14 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTIN14ValidateForm(properties: FormProperties): ReactElement {
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
        GTINValidator.validateGTIN14(formData.identificationKey);

        return `✓ ${formData.identificationKey}`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN14ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18nextDemo.t("GS1.gtin14Label")}
            hint={i18nextDemo.t("GS1.gtin14ToBeValidatedHint")}
        />
    </BaseForm>;
}

GTIN14ValidateForm.resourceName = "GS1.validateGTIN14Subtitle" as ParseKeys;
