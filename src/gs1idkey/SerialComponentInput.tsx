import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";

/**
 * Serial component input. Renders a required string text control with name "serialComponent".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SerialComponentInput(properties: Pick<InputProperties<string>, "onProcess">): ReactElement {
    return <TextInput
        name="serialComponent"
        label={i18nextDemo.t("GS1.serialComponentLabel")}
        hint={i18nextDemo.t("GS1.serialComponentHint")}
        type="string"
        isRequired
        onProcess={properties.onProcess}
    />;
}
