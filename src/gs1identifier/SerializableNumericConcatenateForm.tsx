import { PrefixManager, PrefixTypes } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm } from "./BaseForm.tsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.tsx";
import { type SerialComponentData, SerialComponentInput } from "./SerialComponentInput.tsx";
import type {
    FormProperties as SerializableNumericIdentifierFormProperties
} from "./SerializableNumericIdentifier.tsx";

/**
 * Form data.
 */
type FormData = IdentifierData & SerialComponentData;

/**
 * Concatenate a base identifier with a serial component form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SerializableNumericConcatenateForm(properties: SerializableNumericIdentifierFormProperties): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     * 
     * @returns
     * Concatenated identifier.
     */
    function onProcess(formData: FormData): string {
        return properties.getCreator(PrefixManager.get(PrefixTypes.GS1CompanyPrefix, "9521234")).concatenate(formData.identifier, formData.serialComponent);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={SerializableNumericConcatenateForm.resourceName}
        onProcess={onProcess}
        resultName="identifier"
    >
        <IdentifierInput
            identifierType={properties.identifierType}
            label={i18nextDemo.t("GS1.baseIdentifierLabel", {
                identifierType: properties.identifierType
            })}
            hint={i18nextDemo.t("GS1.baseIdentifierHint", {
                identifierType: properties.identifierType
            })}
        />
        <SerialComponentInput />
    </BaseForm>;
}

SerializableNumericConcatenateForm.resourceName = "GS1.concatenateSerializedSubtitle" as ParseKeys;
