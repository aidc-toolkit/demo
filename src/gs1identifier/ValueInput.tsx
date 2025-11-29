import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { ValueInput as StringValueInput } from "../string/ValueInput";

/**
 * Value input. Renders a required number text control with name "value".
 *
 * @returns
 * React element.
 */
export function ValueInput(): ReactElement {
    return <StringValueInput
        hint={i18nextDemo.t("GS1.valueHint")}
    />;
}
