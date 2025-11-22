import { GTINCreator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";
import { type IdentificationKeyData, IdentificationKeyInput } from "./IdentificationKeyInput.tsx";

/**
 * Form data.
 */
type FormData = IdentificationKeyData;

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
        return GTINCreator.zeroSuppress(formData.identificationKey);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN12ZeroSuppressForm.resourceName}
        onProcess={onProcess}
        resultName="zeroSuppressedGTIN12"
    >
        <IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            label={i18nextDemo.t("GS1.gtin12Label")}
            hint={i18nextDemo.t("GS1.gtin12ToBeZeroSuppressedHint")}
        />
    </BaseForm>;
}

GTIN12ZeroSuppressForm.resourceName = "GS1.zeroSuppressGTIN12Subtitle" as ParseKeys;
