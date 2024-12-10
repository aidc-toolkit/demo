import { GTINCreator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import i18next, { demoNS } from "../locale/i18n.ts";
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
export function ConvertToGTIN14Form(properties: GTIN.FormProperties): ReactElement {
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
        subtitleResourceName={ConvertToGTIN14Form.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <Demo.TextInput
            name="indicatorDigit"
            label={i18next.t("GS1.indicatorDigitLabel", {
                ns: demoNS
            })}
            hint={i18next.t("GS1.indicatorDigitHint", {
                ns: demoNS
            })}
            type="string"
            isRequired={true}
            onProcess={(inputValue) => {
                indicatorDigit = inputValue;
            }}
        />
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18next.t("GS1.gtinLabel", {
                ns: demoNS
            })}
            hint={i18next.t("GS1.gtinToBeConvertedToGTIN14Hint", {
                ns: demoNS
            })}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

ConvertToGTIN14Form.resourceName = "GS1.convertToGTIN14Subtitle";
