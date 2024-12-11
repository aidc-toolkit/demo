import type { Exclusion } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import i18next, { demoNS } from "../locale/i18n.ts";
import * as String from "./String.tsx";

/**
 * Validate string form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValidateForm(properties: String.FormProperties): ReactElement {
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

    return <String.BaseForm
        {...properties}
        subtitleResourceName={ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <String.SInput
            hint={i18next.t("String.stringToValidate", {
                ns: demoNS,
                name: i18next.t(properties.characterSetResourceName, {
                    ns: demoNS
                })
            })}
            onProcess={(inputValue) => {
                s = inputValue ?? "";
            }}
        />
        <Demo.TextInput
            name="minimumLength"
            label={i18next.t("String.minimumLengthLabel", {
                ns: demoNS
            })}
            hint={i18next.t("String.minimumLengthHint", {
                ns: demoNS,
                name: i18next.t(properties.characterSetResourceName, {
                    ns: demoNS
                })
            })}
            type="number"
            isRequired={false}
            onProcess={(inputValue) => {
                minimumLength = inputValue;
            }}
        />
        <Demo.TextInput
            name="maximumLength"
            label={i18next.t("String.maximumLengthLabel", {
                ns: demoNS
            })}
            hint={i18next.t("String.maximumLengthHint", {
                ns: demoNS,
                name: i18next.t(properties.characterSetResourceName, {
                    ns: demoNS
                })
            })}
            type="number"
            isRequired={false}
            onProcess={(inputValue) => {
                maximumLength = inputValue;
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
    </String.BaseForm>;
}

ValidateForm.resourceName = "String.validateSubtitle";
