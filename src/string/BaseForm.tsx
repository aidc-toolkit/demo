import type { CharacterSetCreator, CharacterSetValidator } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { BaseForm as DemoBaseForm, type FormProperties as DemoFormProperties } from "../BaseForm";
import { i18nextDemo } from "../locale/i18n";

/**
 * Form properties. All string forms require these properties to be set.
 */
export interface FormProperties<IsValidatorOnly extends boolean> {
    /**
     * Character set resource name.
     */
    readonly characterSetResourceName: ParseKeys;

    /**
     * If true, only validator is supported.
     */
    readonly isValidatorOnly: IsValidatorOnly;

    /**
     * Character set validator or creator.
     */
    readonly validatorOrCreator: IsValidatorOnly extends true ? CharacterSetValidator : CharacterSetCreator;
}

/**
 * Base form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BaseForm<TFormData extends object>(properties: DemoFormProperties<TFormData> & FormProperties<boolean>): ReactElement {
    return <DemoBaseForm
        {...properties}
        title={i18nextDemo.t("String.characterSetTitle", {
            name: i18nextDemo.t(properties.characterSetResourceName)
        })}
    />;
}
