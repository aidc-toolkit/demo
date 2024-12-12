import type { Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import * as String from "./String.tsx";

/**
 * Create string form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateForm(properties: String.FormProperties): ReactElement {
    let length: number;
    let value: number;
    let exclusion: Exclusion;
    let tweak: number | undefined;

    /**
     * Process the form.
     *
     * @returns
     * Created string.
     */
    function onProcess(): string {
        return properties.creator.create(length, value, exclusion, tweak);
    }

    return <String.BaseForm
        {...properties}
        subtitleResourceName={CreateForm.resourceName}
        onProcess={onProcess}
        resultName="s"
    >
        <String.LengthInput
            onProcess={(inputValue) => {
                length = inputValue;
            }}
        />
        <String.ValueInput
            hint={i18nextDemo.t("String.valueHint", {
                name: i18nextDemo.t(properties.characterSetResourceName)
            })}
            onProcess={(inputValue) => {
                value = inputValue;
            }}
        />
        <String.ExclusionInput
            hint={i18nextDemo.t("String.exclusionHint")}
            exclusionSupport={properties.creator.exclusionSupport}
            onProcess={(inputValue) => {
                exclusion = inputValue;
            }}
        />
        <String.TweakInput
            onProcess={(inputValue) => {
                tweak = inputValue;
            }}
        />
    </String.BaseForm>;
}

CreateForm.resourceName = "String.createSubtitle" as ParseKeys;
