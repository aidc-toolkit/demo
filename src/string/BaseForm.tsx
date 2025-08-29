import type { CharacterSetCreator } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { BaseForm as DemoBaseForm, type FormProperties as DemoFormProperties } from "../BaseForm.tsx";
import { i18nextDemo } from "../locale/i18n.ts";

/**
 * Form properties. All string forms require these properties to be set.
 */
export interface FormProperties {
    /**
     * Character set resource name.
     */
    readonly characterSetResourceName: ParseKeys;

    /**
     * Character set creator.
     */
    readonly creator: CharacterSetCreator;
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
export function BaseForm(properties: DemoFormProperties & FormProperties): ReactElement {
    return <DemoBaseForm
        {...properties}
        title={i18nextDemo.t("String.characterSetTitle", {
            name: i18nextDemo.t(properties.characterSetResourceName)
        })}
    />;
}
