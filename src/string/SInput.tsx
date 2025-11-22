import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { TextInput } from "../TextInput.tsx";

/**
 * S data.
 */
export interface SData {
    /**
     * S.
     */
    s: string;
}

/**
 * S input. Renders an optional string text control with name "s".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SInput<TFormData extends SData>(properties: Pick<InputProperties<TFormData, string | undefined>, "hint">): ReactElement {
    return <TextInput
        {...properties}
        name="s"
        type="string"
        isRequired={false}
    />;
}
