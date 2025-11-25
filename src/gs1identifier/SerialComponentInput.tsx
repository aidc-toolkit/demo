import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";

/**
 * Serial component data.
 */
export interface SerialComponentData {
    /**
     * Serial component.
     */
    serialComponent: string;
}

/**
 * Serial component input. Renders a required string text control with name "serialComponent".
 *
 * @returns
 * React element.
 */
export function SerialComponentInput(): ReactElement {
    return <TextInput
        name="serialComponent"
        label={i18nextDemo.t("GS1.serialComponentLabel")}
        hint={i18nextDemo.t("GS1.serialComponentHint")}
        type="string"
        isRequired
    />;
}
