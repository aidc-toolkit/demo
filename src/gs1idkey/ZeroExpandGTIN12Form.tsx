import { GTINValidator } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import i18next, { demoNS } from "../locale/i18n.ts";
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
export function ZeroExpandGTIN12Form(properties: GTIN.FormProperties): ReactElement {
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
        subtitleResourceName={ZeroExpandGTIN12Form.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <Demo.TextInput
            name="zeroSuppressedGTIN12"
            label={i18next.t("GS1.zeroSuppressedGTIN12Label", {
                ns: demoNS
            })}
            hint={i18next.t("GS1.zeroSuppressedGTIN12Hint", {
                ns: demoNS
            })}
            type="string"
            isRequired={true}
            onProcess={(inputValue) => {
                zeroSuppressedGTIN12 = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

ZeroExpandGTIN12Form.resourceName = "GS1.zeroExpandGTIN12Subtitle";
