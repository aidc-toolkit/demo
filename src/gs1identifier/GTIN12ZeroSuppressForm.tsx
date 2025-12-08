import { GTINValidator, IdentifierTypes } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.js";
import { BaseForm } from "./BaseForm.jsx";
import type { FormProperties } from "./GTIN.jsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.jsx";

/**
 * Form data.
 */
type FormData = IdentifierData<typeof IdentifierTypes.GTIN>;

/**
 * Zero-suppress GTIN-12 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTIN12ZeroSuppressForm(properties: FormProperties): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Zero-suppressed GTIN-12.
     */
    function onProcess(formData: FormData): string {
        return GTINValidator.zeroSuppress(formData.identifier);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN12ZeroSuppressForm.resourceName}
        onProcess={onProcess}
        resultName="zeroSuppressedGTIN12"
    >
        <IdentifierInput
            identifierType={IdentifierTypes.GTIN}
            label={i18nextDemo.t("GS1.gtin12Label")}
            hint={i18nextDemo.t("GS1.gtin12ToBeZeroSuppressedHint")}
        />
    </BaseForm>;
}

GTIN12ZeroSuppressForm.resourceName = "GS1.zeroSuppressGTIN12Subtitle" as ParseKeys;
