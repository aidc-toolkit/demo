import type { Exclusion } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import i18next, { demoNS } from "../locale/i18n.ts";
import * as String from "./String.tsx";

/**
 * Determine string value form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValueForm(properties: String.FormProperties): ReactElement {
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

    return <String.BaseForm
        {...properties}
        resourceName={ValueForm.resourceName}
        onProcess={onProcess}
        resultName="value"
    >
        <String.SInput
            hint={i18next.t("String.stringToConvert", {
                ns: demoNS,
                name: i18next.t(properties.resourceName, {
                    ns: demoNS
                })
            })}
            onProcess={(inputValue) => {
                s = inputValue ?? "";
            }}
        />
        <String.ExclusionInput
            hint={i18next.t("String.exclusionHint", {
                ns: demoNS
            })}
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

ValueForm.resourceName = "String.valueSubtitle";
