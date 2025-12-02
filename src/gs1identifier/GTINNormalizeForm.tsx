import { GTINCreator, IdentifierTypes } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { BaseForm } from "./BaseForm";
import type { FormProperties } from "./GTIN";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput";

/**
 * Form data.
 */
type FormData = IdentifierData<typeof IdentifierTypes.GTIN>;

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
        return GTINCreator.normalize(formData.identifier);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTINNormalizeForm.resourceName}
        onProcess={onProcess}
        resultName="identifier"
    >
        <IdentifierInput
            identifierType={IdentifierTypes.GTIN}
            label={i18nextDemo.t("GS1.gtinLabel")}
            hint={i18nextDemo.t("GS1.gtinToBeNormalizedHint")}
        />
    </BaseForm>;
}

GTINNormalizeForm.resourceName = "GS1.normalizeGTINSubtitle" as ParseKeys;
