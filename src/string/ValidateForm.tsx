import { FormGroup } from "@mui/material";
import type { ReactElement } from "react";
import { type DemoParseKeys, i18nextDemoT } from "../locale/i18n.js";
import { TextInput } from "../TextInput.jsx";
import { BaseForm, type FormProperties } from "./BaseForm.jsx";
import { type ExclusionData, ExclusionInput } from "./ExclusionInput.jsx";
import { type SData, SInput } from "./SInput.jsx";

/**
 * Form data.
 */
interface FormData extends SData, ExclusionData {
    /**
     * Minimum length.
     */
    minimumLength: number;

    /**
     * Maximum length.
     */
    maximumLength: number;
}

/**
 * Validate string form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateForm(properties: FormProperties<true>): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Checkmark and string.
     */
    function onProcess(formData: FormData): string {
        properties.validatorOrCreator.validate(formData.s, {
            minimumLength: formData.minimumLength,
            maximumLength: formData.maximumLength,
            exclusion: formData.exclusion
        });

        return `✓ ${formData.s}`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <SInput
            hint={i18nextDemoT("String.stringToValidate", {
                name: i18nextDemoT(properties.characterSetResourceName)
            })}
        />
        <FormGroup
            row
            sx={{
                flexWrap: "nowrap",
                gap: 1
            }}
        >
            <TextInput
                name="minimumLength"
                label={i18nextDemoT("String.minimumLengthLabel")}
                hint={i18nextDemoT("String.minimumLengthHint", {
                    name: i18nextDemoT(properties.characterSetResourceName)
                })}
                type="number"
                isRequired={false}
            />
            <TextInput
                name="maximumLength"
                label={i18nextDemoT("String.maximumLengthLabel")}
                hint={i18nextDemoT("String.maximumLengthHint", {
                    name: i18nextDemoT(properties.characterSetResourceName)
                })}
                type="number"
                isRequired={false}
            />
        </FormGroup>
        <ExclusionInput
            hint={i18nextDemoT("String.exclusionHint")}
            exclusionSupport={properties.validatorOrCreator.exclusionSupport}
        />
    </BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as DemoParseKeys;
