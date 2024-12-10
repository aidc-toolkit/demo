import { GTINCreator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import i18next, { demoNS } from "../locale/i18n.ts";
import type * as GTIN from "./GTIN.tsx";
import * as IdentificationKey from "./IdentificationKey.tsx";

/**
 * Normalize GTIN form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NormalizeGTINForm(properties: GTIN.FormProperties): ReactElement {
    let identificationKey: string;

    /**
     * Process the form.
     *
     * @returns
     * Normalized GTIN.
     */
    function onProcess(): string {
        return GTINCreator.normalize(identificationKey);
    }

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={NormalizeGTINForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18next.t("GS1.gtinLabel", {
                ns: demoNS
            })}
            hint={i18next.t("GS1.gtinToBeNormalizedHint", {
                ns: demoNS
            })}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

NormalizeGTINForm.resourceName = "GS1.normalizeGTINSubtitle";
