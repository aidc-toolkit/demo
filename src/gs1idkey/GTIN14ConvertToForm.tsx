import { GTINCreator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import type * as GTIN from "./GTIN.tsx";
import * as IdentificationKey from "./IdentificationKey.tsx";

/**
 * Convert a GTIN of any length to GTIN-14 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTIN14ConvertToForm(properties: GTIN.FormProperties): ReactElement {
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

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={GTIN14ConvertToForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <Demo.TextInput
            name="indicatorDigit"
            label={i18nextDemo.t("GS1.indicatorDigitLabel")}
            hint={i18nextDemo.t("GS1.indicatorDigitHint")}
            type="string"
            isRequired={true}
            onProcess={(inputValue) => {
                indicatorDigit = inputValue;
            }}
        />
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18nextDemo.t("GS1.gtinLabel")}
            hint={i18nextDemo.t("GS1.gtinToBeConvertedToGTIN14Hint")}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

GTIN14ConvertToForm.resourceName = "GS1.convertToGTIN14Subtitle" as ParseKeys;
