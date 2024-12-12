import { GTINLevel, GTINValidator, IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import type * as GTIN from "./GTIN.tsx";
import * as IdentificationKey from "./IdentificationKey.tsx";

/**
 * Validate any GTIN form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTINValidateAnyForm(properties: GTIN.FormProperties): ReactElement {
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

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={GTINValidateAnyForm.resourceName}
        onProcess={onProcess}
    >
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={IdentificationKeyType.GTIN}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
        <Demo.EnumInput
            name="gtinLevel"
            label={i18nextDemo.t("GS1.levelLabel")}
            hint={i18nextDemo.t("GS1.levelHint")}
            values={[GTINLevel.Any, GTINLevel.RetailConsumer, GTINLevel.OtherThanRetailConsumer]}
            names={gtinLevelNames}
            onProcess={(inputValue) => {
                gtinLevel = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

GTINValidateAnyForm.resourceName = "GS1.validateAnySubtitle" as ParseKeys;
