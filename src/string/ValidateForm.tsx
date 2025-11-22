import { FormGroup } from "@mui/material";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { type ExclusionData, ExclusionInput } from "./ExclusionInput.tsx";
import { type SData, SInput } from "./SInput.tsx";

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
export function ValidateForm(properties: FormProperties): ReactElement {
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
        properties.creator.validate(formData.s, {
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
            hint={i18nextDemo.t("String.stringToValidate", {
                name: i18nextDemo.t(properties.characterSetResourceName)
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
                label={i18nextDemo.t("String.minimumLengthLabel")}
                hint={i18nextDemo.t("String.minimumLengthHint", {
                    name: i18nextDemo.t(properties.characterSetResourceName)
                })}
                type="number"
                isRequired={false}
            />
            <TextInput
                name="maximumLength"
                label={i18nextDemo.t("String.maximumLengthLabel")}
                hint={i18nextDemo.t("String.maximumLengthHint", {
                    name: i18nextDemo.t(properties.characterSetResourceName)
                })}
                type="number"
                isRequired={false}
            />
        </FormGroup>
        <ExclusionInput
            hint={i18nextDemo.t("String.exclusionHint")}
            exclusionSupport={properties.creator.exclusionSupport}
        />
    </BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
