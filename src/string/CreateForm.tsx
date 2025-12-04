import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { BaseForm, type FormProperties } from "./BaseForm";
import { type ExclusionData, ExclusionInput } from "./ExclusionInput";
import { type LengthData, LengthInput } from "./LengthInput";
import { type TweakData, TweakInput } from "./TweakInput";
import { type ValueData, ValueInput } from "./ValueInput";

/**
 * Form data.
 */
type FormData = LengthData & ValueData & ExclusionData & TweakData;

/**
 * Create string form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateForm(properties: FormProperties<false>): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Created string.
     */
    function onProcess(formData: FormData): string {
        return properties.validatorOrCreator.create(formData.length, formData.value, formData.exclusion, formData.tweak);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={CreateForm.resourceName}
        onProcess={onProcess}
        resultName="s"
    >
        <LengthInput />
        <ValueInput
            hint={i18nextDemo.t("String.valueHint", {
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

CreateForm.resourceName = "String.createSubtitle" as ParseKeys;
