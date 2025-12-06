import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.js";
import { i18nextDemo } from "../locale/i18n.js";
import { TextInput } from "../TextInput.jsx";

/**
 * Value data.
 */
export interface ValueData {
    /**
     * Value.
     */
    value: number;
}

/**
 * Value input. Renders a required number text control with name "value".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValueInput<TFormData extends ValueData>(properties: Pick<InputProperties<TFormData, number>, "hint">): ReactElement {
    return <TextInput
        {...properties}
        name="value"
        label={i18nextDemo.t("String.valueLabel")}
        hint={properties.hint}
        type="number"
        isRequired
    />;
}
