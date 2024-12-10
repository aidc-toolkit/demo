import { GTINValidator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import i18next, { demoNS } from "../locale/i18n.ts";
import type * as GTIN from "./GTIN.tsx";
import * as IdentificationKey from "./IdentificationKey.tsx";

/**
 * Validate GTIN-14 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateGTIN14Form(properties: GTIN.FormProperties): ReactElement {
    let identificationKey: string;

    /**
     * Process the form.
     *
     * @returns
     * Checkmark and identification key.
     */
    function onProcess(): string {
        GTINValidator.validateGTIN14(identificationKey);

        return `✓ ${identificationKey}`;
    }

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={ValidateGTIN14Form.resourceName}
        onProcess={onProcess}
    >
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18next.t("GS1.gtin14Label", {
                ns: demoNS
            })}
            hint={i18next.t("GS1.gtin14ToBeValidatedHint", {
                ns: demoNS
            })}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

ValidateGTIN14Form.resourceName = "GS1.validateGTIN14Subtitle";
