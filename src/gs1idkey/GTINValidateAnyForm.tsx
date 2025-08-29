import { GTINLevel, GTINValidator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { EnumInput } from "../EnumInput.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties } from "./GTIN.tsx";
import { IdentificationKeyInput } from "./IdentificationKeyInput.tsx";

/**
 * Validate any GTIN form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTINValidateAnyForm(properties: FormProperties): ReactElement {
    let identificationKey: string;
    let gtinLevel: GTINLevel;

    const gtinLevelNames = [i18nextDemo.t("GS1.levelAnyLabel"), i18nextDemo.t("GS1.levelRetailConsumerLabel"), i18nextDemo.t("GS1.levelOtherThanRetailConsumerLabel")];

    /**
     * Process the form.
     *
     * @returns
     * Checkmark and identification key and GTIN level.
     */
    function onProcess(): string {
        GTINValidator.validateAny(identificationKey, gtinLevel);

        return `✓ ${identificationKey} (${gtinLevelNames[gtinLevel]})`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTINValidateAnyForm.resourceName}
        onProcess={onProcess}
    >
        <IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
        <EnumInput
            name="gtinLevel"
            label={i18nextDemo.t("GS1.levelLabel")}
            hint={i18nextDemo.t("GS1.levelHint")}
            values={[GTINLevel.Any, GTINLevel.RetailConsumer, GTINLevel.OtherThanRetailConsumer]}
            names={gtinLevelNames}
            onProcess={(inputValue) => {
                gtinLevel = inputValue;
            }}
        />
    </BaseForm>;
}

GTINValidateAnyForm.resourceName = "GS1.validateAnySubtitle" as ParseKeys;
