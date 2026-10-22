import type { ReactElement } from "react";
import { i18nextDemoT } from "../locale/i18n.js";
import { TextInput } from "../TextInput.jsx";

/**
 * Tweak data.
 */
export interface TweakData {
    /**
     * Tweak.
     */
    tweak: number | undefined;
}

/**
 * Tweak input. Renders an optional number text control with name "tweak".
 *
 * @returns
 * React element.
 */
export function TweakInput(): ReactElement {
    return <TextInput
        name="tweak"
        label={i18nextDemoT("String.tweakLabel")}
        hint={i18nextDemoT("String.tweakHint")}
        type="number"
        isRequired={false}
    />;
}
