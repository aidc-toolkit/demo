import type { IdentificationKeyType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import type { Optional } from "../type.ts";

/**
 * Identification key input properties.
 */
interface IdentificationKeyInputProperties extends Optional<Pick<InputProperties<string>, "label" | "hint" | "onProcess">, "label" | "hint"> {
    /**
     * Identification key type.
     */
    readonly identificationKeyType: IdentificationKeyType;
}

/**
 * Identification key input. Renders a required string text control with name "identificationKey".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function IdentificationKeyInput(properties: IdentificationKeyInputProperties): ReactElement {
    return <TextInput
        {...properties}
        name="identificationKey"
        label={properties.label ?? properties.identificationKeyType}
        hint={properties.hint ?? i18nextDemo.t("GS1.identificationKeyHint", {
            identificationKeyType: properties.identificationKeyType
        })}
        type="string"
        isRequired
    />;
}
