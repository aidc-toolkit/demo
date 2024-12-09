import type {
    SerializableNumericIdentificationKeyCreator,
    SerializableNumericIdentificationKeyValidator
} from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import i18next, { demoNS } from "../locale/i18n.ts";
import type * as NonGTINNumericIdentificationKey from "./NonGTINNumericIdentificationKey.tsx";

/**
 * Serial component input properties.
 */
interface SerialComponentInputProperties extends Demo.InputProperties<string> {
}

/**
 * Serial component input. Renders a required string text control with name "serialComponent".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SerialComponentInput(properties: SerialComponentInputProperties): ReactElement {
    return <Demo.TextInput
        name="serialComponent"
        label={i18next.t("GS1.serialComponentLabel", {
            ns: demoNS
        })}
        hint={i18next.t("GS1.serialComponentHint", {
            ns: demoNS
        })}
        type="string"
        isRequired={true}
        onProcess={properties.onProcess}
    />;
}

/**
 * Form properties.
 */
export type FormProperties = NonGTINNumericIdentificationKey.FormProperties<SerializableNumericIdentificationKeyValidator, SerializableNumericIdentificationKeyCreator>;
