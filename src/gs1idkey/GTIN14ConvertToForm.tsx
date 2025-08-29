import { GTINCreator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";
import { IdentificationKeyInput } from "./IdentificationKeyInput.tsx";

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
    let indicatorDigit: string;
    let identificationKey: string;

    /**
     * Process the form.
     *
     * @returns
     * GTIN-14.
     */
    function onProcess(): string {
        return GTINCreator.convertToGTIN14(indicatorDigit, identificationKey);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN14ConvertToForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <TextInput
            name="indicatorDigit"
            label={i18nextDemo.t("GS1.indicatorDigitLabel")}
            hint={i18nextDemo.t("GS1.indicatorDigitHint")}
            type="string"
            isRequired
            onProcess={(inputValue) => {
                indicatorDigit = inputValue;
            }}
        />
        <IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18nextDemo.t("GS1.gtinLabel")}
            hint={i18nextDemo.t("GS1.gtinToBeConvertedToGTIN14Hint")}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
    </BaseForm>;
}

GTIN14ConvertToForm.resourceName = "GS1.convertToGTIN14Subtitle" as ParseKeys;
