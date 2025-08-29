import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";

/**
 * Tweak input. Renders an optional number text control with name "tweak".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function TweakInput(properties: Pick<InputProperties<number | undefined>, "onProcess">): ReactElement {
    return <TextInput
        {...properties}
        name="tweak"
        label={i18nextDemo.t("String.tweakLabel")}
        hint={i18nextDemo.t("String.tweakHint")}
        type="number"
        isRequired={false}
    />;
}
