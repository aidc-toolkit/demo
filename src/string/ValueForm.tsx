import type { Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { ExclusionInput } from "./ExclusionInput.tsx";
import { SInput } from "./SInput.tsx";
import { TweakInput } from "./TweakInput.tsx";

/**
 * Determine string value form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValueForm(properties: FormProperties): ReactElement {
    let s: string;
    let exclusion: Exclusion;
    let tweak: number | undefined;

    /**
     * Process the form.
     *
     * @returns
     * Value as string.
     */
    function onProcess(): string {
        return properties.creator.valueFor(s, exclusion, tweak).toString();
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={ValueForm.resourceName}
        onProcess={onProcess}
        resultName="value"
    >
        <SInput
            hint={i18nextDemo.t("String.stringToConvert", {
                name: i18nextDemo.t(properties.characterSetResourceName)
            })}
            onProcess={(inputValue) => {
                s = inputValue ?? "";
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

ValueForm.resourceName = "String.valueSubtitle" as ParseKeys;
