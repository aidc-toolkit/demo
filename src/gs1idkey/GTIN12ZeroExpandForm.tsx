import { GTINValidator } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import type * as GTIN from "./GTIN.tsx";
import * as IdentificationKey from "./IdentificationKey.tsx";

/**
 * Zero-expand GTIN-12 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTIN12ZeroExpandForm(properties: GTIN.FormProperties): ReactElement {
    let zeroSuppressedGTIN12: string;

    /**
     * Process the form.
     *
     * @returns
     * Zero-expanded GTIN-12.
     */
    function onProcess(): string {
        return GTINValidator.zeroExpand(zeroSuppressedGTIN12);
    }

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={GTIN12ZeroExpandForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <Demo.TextInput
            name="zeroSuppressedGTIN12"
            label={i18nextDemo.t("GS1.zeroSuppressedGTIN12Label")}
            hint={i18nextDemo.t("GS1.zeroSuppressedGTIN12Hint")}
            type="string"
            isRequired={true}
            onProcess={(inputValue) => {
                zeroSuppressedGTIN12 = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

GTIN12ZeroExpandForm.resourceName = "GS1.zeroExpandGTIN12Subtitle" as ParseKeys;
