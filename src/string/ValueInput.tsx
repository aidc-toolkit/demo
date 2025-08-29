import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";

/**
 * Value input. Renders a required number text control with name "value".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValueInput(properties: Pick<InputProperties<number>, "hint" | "onProcess">): ReactElement {
    return <TextInput
        {...properties}
        name="value"
        label={i18nextDemo.t("String.valueLabel")}
        hint={properties.hint}
        type="number"
        isRequired
    />;
}
