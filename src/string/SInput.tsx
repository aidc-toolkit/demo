import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { TextInput } from "../TextInput.tsx";

/**
 * S input. Renders an optional string text control with name "s".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SInput(properties: Pick<InputProperties<string | undefined>, "hint" | "onProcess">): ReactElement {
    return <TextInput
        {...properties}
        name="s"
        type="string"
        isRequired={false}
    />;
}
