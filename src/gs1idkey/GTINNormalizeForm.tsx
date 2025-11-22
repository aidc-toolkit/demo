import { GTINCreator, IdentificationKeyType } from "@aidc-toolkit/gs1";
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
 * Normalize GTIN form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTINNormalizeForm(properties: FormProperties): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     * 
     * @returns
     * Normalized GTIN.
     */
    function onProcess(formData: FormData): string {
        return GTINCreator.normalize(formData.identificationKey);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTINNormalizeForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18nextDemo.t("GS1.gtinLabel")}
            hint={i18nextDemo.t("GS1.gtinToBeNormalizedHint")}
        />
    </BaseForm>;
}

GTINNormalizeForm.resourceName = "GS1.normalizeGTINSubtitle" as ParseKeys;
