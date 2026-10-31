import { CharacterSetCreator } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.js";
import { TextInput } from "../TextInput.jsx";

/**
 * Length data.
 */
export interface LengthData {
    /**
     * Length.
     */
    length: number;
}

/**
 * Length input. Renders a required number text control with name "length".
 *
 * @returns
 * React element.
 */
export function LengthInput(): ReactElement {
    return <TextInput
        name="length"
        label={i18nextDemo.t("String.lengthLabel")}
        hint={i18nextDemo.t("String.lengthHint", {
            maximumLength: CharacterSetCreator.MAXIMUM_STRING_LENGTH
        })}
        type="number"
        isRequired
    />;
}
