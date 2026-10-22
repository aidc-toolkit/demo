import type { ReactElement } from "react";
import { i18nextDemoT } from "../locale/i18n.js";
import { TextInput } from "../TextInput.jsx";

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
        label={i18nextDemoT("GS1.serialComponentLabel")}
        hint={i18nextDemoT("GS1.serialComponentHint")}
        type="string"
        isRequired
    />;
}
