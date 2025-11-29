import { GTINValidator } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { TextInput } from "../TextInput";
import { BaseForm } from "./BaseForm";
import type { FormProperties } from "./GTIN";

/**
 * Form data.
 */
interface FormData {
    zeroSuppressedGTIN12: string;
}

/**
 * Zero-expand GTIN-12 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTIN12ZeroExpandForm(properties: FormProperties): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Zero-expanded GTIN-12.
     */
    function onProcess(formData: FormData): string {
        return GTINValidator.zeroExpand(formData.zeroSuppressedGTIN12);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN12ZeroExpandForm.resourceName}
        onProcess={onProcess}
        resultName="identifier"
    >
        <TextInput
            name="zeroSuppressedGTIN12"
            label={i18nextDemo.t("GS1.zeroSuppressedGTIN12Label")}
            hint={i18nextDemo.t("GS1.zeroSuppressedGTIN12Hint")}
            type="string"
            isRequired
        />
    </BaseForm>;
}

GTIN12ZeroExpandForm.resourceName = "GS1.zeroExpandGTIN12Subtitle" as ParseKeys;
