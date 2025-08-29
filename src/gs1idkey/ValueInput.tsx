import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";
import { ValueInput as StringValueInput } from "../string/ValueInput.tsx";

/**
 * Value input. Renders a required number text control with name "value".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValueInput(properties: Pick<InputProperties<number>, "onProcess">): ReactElement {
    return <StringValueInput
        {...properties}
        hint={i18nextDemo.t("GS1.valueHint")}
    />;
}
