import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { TextInput } from "../TextInput";

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
        label={i18nextDemo.t("String.tweakLabel")}
        hint={i18nextDemo.t("String.tweakHint")}
        type="number"
        isRequired={false}
    />;
}
