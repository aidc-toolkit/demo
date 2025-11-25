import { GTINCreator, IdentifierTypes } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.tsx";

/**
 * Form data.
 */
interface FormData extends IdentifierData {
    /**
     * Indicator digit.
     */
    indicatorDigit: string;
}

/**
 * Convert a GTIN of any length to GTIN-14 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTIN14ConvertToForm(properties: FormProperties): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * GTIN-14.
     */
    function onProcess(formData: FormData): string {
        return GTINCreator.convertToGTIN14(formData.indicatorDigit, formData.identifier);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN14ConvertToForm.resourceName}
        onProcess={onProcess}
        resultName="identifier"
    >
        <TextInput
            name="indicatorDigit"
            label={i18nextDemo.t("GS1.indicatorDigitLabel")}
            hint={i18nextDemo.t("GS1.indicatorDigitHint")}
            type="string"
            isRequired
        />
        <IdentifierInput
            identifierType={IdentifierTypes.GTIN}
            label={i18nextDemo.t("GS1.gtinLabel")}
            hint={i18nextDemo.t("GS1.gtinToBeConvertedToGTIN14Hint")}
        />
    </BaseForm>;
}

GTIN14ConvertToForm.resourceName = "GS1.convertToGTIN14Subtitle" as ParseKeys;
