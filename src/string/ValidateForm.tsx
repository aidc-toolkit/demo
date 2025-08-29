import type { Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm, type FormProperties } from "./BaseForm.tsx";
import { ExclusionInput } from "./ExclusionInput.tsx";
import { SInput } from "./SInput.tsx";
import { FormGroup } from "@mui/material";

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
    let s: string;
    let minimumLength: number | undefined;
    let maximumLength: number | undefined;
    let exclusion: Exclusion;

    /**
     * Process the form.
     *
     * @returns
     * Checkmark and string.
     */
    function onProcess(): string {
        properties.creator.validate(s, {
            minimumLength,
            maximumLength,
            exclusion
        });

        return `✓ ${s}`;
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
            onProcess={(inputValue) => {
                s = inputValue ?? "";
            }}
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
                onProcess={(inputValue) => {
                    minimumLength = inputValue;
                }}
            />
            <TextInput
                name="maximumLength"
                label={i18nextDemo.t("String.maximumLengthLabel")}
                hint={i18nextDemo.t("String.maximumLengthHint", {
                    name: i18nextDemo.t(properties.characterSetResourceName)
                })}
                type="number"
                isRequired={false}
                onProcess={(inputValue) => {
                    maximumLength = inputValue;
                }}
            />
        </FormGroup>
        <ExclusionInput
            hint={i18nextDemo.t("String.exclusionHint")}
            exclusionSupport={properties.creator.exclusionSupport}
            onProcess={(inputValue) => {
                exclusion = inputValue;
            }}
        />
    </BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle" as ParseKeys;
