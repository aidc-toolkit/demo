import type { Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { ExclusionInput } from "./ExclusionInput.tsx";
import { LengthInput } from "./LengthInput.tsx";
import { TweakInput } from "./TweakInput.tsx";
import { ValueInput } from "./ValueInput.tsx";

/**
 * Create string form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateForm(properties: FormProperties): ReactElement {
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

    return <BaseForm
        {...properties}
        subtitleResourceName={CreateForm.resourceName}
        onProcess={onProcess}
        resultName="s"
    >
        <LengthInput
            onProcess={(inputValue) => {
                length = inputValue;
            }}
        />
        <ValueInput
            hint={i18nextDemo.t("String.valueHint", {
                name: i18nextDemo.t(properties.characterSetResourceName)
            })}
            onProcess={(inputValue) => {
                value = inputValue;
            }}
        />
        <ExclusionInput
            hint={i18nextDemo.t("String.exclusionHint")}
            exclusionSupport={properties.creator.exclusionSupport}
            onProcess={(inputValue) => {
                exclusion = inputValue;
            }}
        />
        <TweakInput
            onProcess={(inputValue) => {
                tweak = inputValue;
            }}
        />
    </BaseForm>;
}

CreateForm.resourceName = "String.createSubtitle" as ParseKeys;
