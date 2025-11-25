import type { IdentifierType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import type { Optional } from "../type.ts";

/**
 * Identifier data.
 */
export interface IdentifierData {
    /**
     * Identifier.
     */
    identifier: string;
}

/**
 * Identifier input properties.
 */
interface IdentifierInputProperties<TFormData extends IdentifierData> extends Optional<Pick<InputProperties<TFormData, string>, "label" | "hint">, "label" | "hint"> {
    /**
     * Identifier type.
     */
    readonly identifierType: IdentifierType;
}

/**
 * Identifier input. Renders a required string text control with name "identifier".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function IdentifierInput<TFormData extends IdentifierData>(properties: IdentifierInputProperties<TFormData>): ReactElement {
    return <TextInput
        {...properties}
        name="identifier"
        label={properties.label ?? properties.identifierType}
        hint={properties.hint ?? i18nextDemo.t("GS1.identifierHint", {
            identifierType: properties.identifierType
        })}
        type="string"
        isRequired
    />;
}
