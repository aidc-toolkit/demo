import type { ReactElement } from "react";
import { type DemoParseKeys, i18nextDemoT } from "../locale/i18n.js";
import { BaseForm, type FormProperties } from "./BaseForm.jsx";
import { type ExclusionData, ExclusionInput } from "./ExclusionInput.jsx";
import { type SData, SInput } from "./SInput.jsx";
import { type TweakData, TweakInput } from "./TweakInput.jsx";

/**
 * Form data.
 */
type FormData = SData & ExclusionData & TweakData;

/**
 * Determine string value form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValueForm(properties: FormProperties<false>): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Value as string.
     */
    function onProcess(formData: FormData): string {
        return properties.validatorOrCreator.valueFor(formData.s, formData.exclusion, formData.tweak).toString();
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={ValueForm.resourceName}
        onProcess={onProcess}
        resultName="value"
    >
        <SInput
            hint={i18nextDemoT("String.stringToConvert", {
                name: i18nextDemoT(properties.characterSetResourceName)
            })}
        />
        <ExclusionInput
            hint={i18nextDemoT("String.exclusionHint")}
            exclusionSupport={properties.validatorOrCreator.exclusionSupport}
        />
        <TweakInput />
    </BaseForm>;
}

ValueForm.resourceName = "String.valueSubtitle" as DemoParseKeys;
