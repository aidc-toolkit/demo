import { Sequence } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import { type ReactElement, useState } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { type ExclusionData, ExclusionInput } from "./ExclusionInput.tsx";
import { type LengthData, LengthInput } from "./LengthInput.tsx";
import { type StartValueAndCountData, StartValueAndCountInput } from "./StartValueAndCountInput.tsx";
import { type TweakData, TweakInput } from "./TweakInput.tsx";

/**
 * Form data.
 */
type FormData = LengthData & StartValueAndCountData & ExclusionData & TweakData;

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
    const [resultCount, setResultCount] = useState(0);

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Created strings.
     */
    function onProcess(formData: FormData): Iterable<string> {
        setResultCount(formData.count);

        return properties.creator.create(formData.length, new Sequence(formData.startValue, formData.count), formData.exclusion, formData.tweak);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={CreateSequenceForm.resourceName}
        onProcess={onProcess}
        resultCount={resultCount}
    >
        <LengthInput />
        <StartValueAndCountInput
            startValue={{
                hint: i18nextDemo.t("String.startValueHint", {
                    name: i18nextDemo.t(properties.characterSetResourceName)
                })
            }}
            count={{
                hint: i18nextDemo.t("String.countHint", {
                    name: i18nextDemo.t(properties.characterSetResourceName)
                })
            }}
        />
        <ExclusionInput
            hint={i18nextDemo.t("String.exclusionHint")}
            exclusionSupport={properties.creator.exclusionSupport}
        />
        <TweakInput />
    </BaseForm>;
}

CreateSequenceForm.resourceName = "String.createSequenceSubtitle" as ParseKeys;
