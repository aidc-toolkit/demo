import type { Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import * as String from "./String.tsx";

/**
 * Validate string form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateForm(properties: String.FormProperties): ReactElement {
    let s: string;
    let minimumLength: number | undefined;
    let maximumLength: number | undefined;
    let exclusion: Exclusion;

    /**
     * Process the form.
     *
     * @returns
     * Checkmark and string.
     */
    function onProcess(): string {
        properties.creator.validate(s, {
            minimumLength,
            maximumLength,
            exclusion
        });

        return `✓ ${s}`;
    }

    return <String.BaseForm
        {...properties}
        subtitleResourceName={ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <String.SInput
            hint={i18nextDemo.t("String.stringToValidate", {
                name: i18nextDemo.t(properties.characterSetResourceName)
            })}
            onProcess={(inputValue) => {
                s = inputValue ?? "";
            }}
        />
        <Demo.TextInput
            name="minimumLength"
            label={i18nextDemo.t("String.minimumLengthLabel")}
            hint={i18nextDemo.t("String.minimumLengthHint", {
                name: i18nextDemo.t(properties.characterSetResourceName)
            })}
            type="number"
            isRequired={false}
            onProcess={(inputValue) => {
                minimumLength = inputValue;
            }}
        />
        <Demo.TextInput
            name="maximumLength"
            label={i18nextDemo.t("String.maximumLengthLabel")}
            hint={i18nextDemo.t("String.maximumLengthHint", {
                name: i18nextDemo.t(properties.characterSetResourceName)
            })}
            type="number"
            isRequired={false}
            onProcess={(inputValue) => {
                maximumLength = inputValue;
            }}
        />
        <String.ExclusionInput
            hint={i18nextDemo.t("String.exclusionHint")}
            exclusionSupport={properties.creator.exclusionSupport}
            onProcess={(inputValue) => {
                exclusion = inputValue;
            }}
        />
    </String.BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
