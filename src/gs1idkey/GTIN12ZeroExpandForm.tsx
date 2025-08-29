import { GTINValidator } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";

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

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN12ZeroExpandForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <TextInput
            name="zeroSuppressedGTIN12"
            label={i18nextDemo.t("GS1.zeroSuppressedGTIN12Label")}
            hint={i18nextDemo.t("GS1.zeroSuppressedGTIN12Hint")}
            type="string"
            isRequired
            onProcess={(inputValue) => {
                zeroSuppressedGTIN12 = inputValue;
            }}
        />
    </BaseForm>;
}

GTIN12ZeroExpandForm.resourceName = "GS1.zeroExpandGTIN12Subtitle" as ParseKeys;
