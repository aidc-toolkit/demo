import { type Exclusion, Sequence } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import { type ReactElement, useState } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { ExclusionInput } from "./ExclusionInput.tsx";
import { LengthInput } from "./LengthInput.tsx";
import { StartValueAndCountInput } from "./StartValueAndCountInput.tsx";
import { TweakInput } from "./TweakInput.tsx";

/**
 * Create string sequence form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateSequenceForm(properties: FormProperties): ReactElement {
    let length: number;
    let startValue: number;
    let count: number;
    let exclusion: Exclusion;
    let tweak: number | undefined;

    const [resultCount, setResultCount] = useState(0);

    /**
     * Process the form.
     *
     * @returns
     * Created strings.
     */
    function onProcess(): Iterable<string> {
        setResultCount(count);

        return properties.creator.create(length, new Sequence(startValue, count), exclusion, tweak);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={CreateSequenceForm.resourceName}
        onProcess={onProcess}
        resultCount={resultCount}
    >
        <LengthInput
            onProcess={(inputValue) => {
                length = inputValue;
            }}
        />
        <StartValueAndCountInput
            startValue={{
                hint: i18nextDemo.t("String.startValueHint", {
                    name: i18nextDemo.t(properties.characterSetResourceName)
                }),
                onProcess: (inputValue) => {
                    startValue = inputValue;
                }
            }}
            count={{
                hint: i18nextDemo.t("String.countHint", {
                    name: i18nextDemo.t(properties.characterSetResourceName)
                }),
                onProcess: (inputValue) => {
                    count = inputValue;
                }
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

CreateSequenceForm.resourceName = "String.createSequenceSubtitle" as ParseKeys;
