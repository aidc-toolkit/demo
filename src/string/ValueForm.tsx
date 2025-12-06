import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.js";
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
            hint={i18nextDemo.t("String.stringToConvert", {
                name: i18nextDemo.t(properties.characterSetResourceName)
            })}
        />
        <ExclusionInput
            hint={i18nextDemo.t("String.exclusionHint")}
            exclusionSupport={properties.validatorOrCreator.exclusionSupport}
        />
        <TweakInput />
    </BaseForm>;
}

ValueForm.resourceName = "String.valueSubtitle" as ParseKeys;
