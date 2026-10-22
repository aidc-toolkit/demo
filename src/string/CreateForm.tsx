import type { ReactElement } from "react";
import { type DemoParseKeys, i18nextDemoT } from "../locale/i18n.js";
import { BaseForm, type FormProperties } from "./BaseForm.jsx";
import { type ExclusionData, ExclusionInput } from "./ExclusionInput.jsx";
import { type LengthData, LengthInput } from "./LengthInput.jsx";
import { type TweakData, TweakInput } from "./TweakInput.jsx";
import { type ValueData, ValueInput } from "./ValueInput.jsx";

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
            hint={i18nextDemoT("String.valueHint", {
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

CreateForm.resourceName = "String.createSubtitle" as DemoParseKeys;
