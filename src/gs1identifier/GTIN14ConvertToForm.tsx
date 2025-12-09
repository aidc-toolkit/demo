import { type GTINType, GTINValidator, IdentifierTypes } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.js";
import { TextInput } from "../TextInput.jsx";
import { BaseForm } from "./BaseForm.jsx";
import type { FormProperties } from "./GTIN.jsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.jsx";

/**
 * Form data.
 */
interface FormData extends IdentifierData<GTINType> {
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
        return GTINValidator.convertToGTIN14(formData.indicatorDigit, formData.identifier);
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
