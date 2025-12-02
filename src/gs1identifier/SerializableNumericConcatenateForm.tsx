import { PrefixManager, PrefixTypes, PrefixValidator, type SerializableNumericIdentifierType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { BaseForm } from "./BaseForm";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput";
import { type SerialComponentData, SerialComponentInput } from "./SerialComponentInput";
import type { FormProperties as SerializableNumericIdentifierFormProperties } from "./SerializableNumericIdentifier";

/**
 * Form data.
 */
type FormData = IdentifierData<SerializableNumericIdentifierType> & SerialComponentData;

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
        const identifier = formData.identifier;

        return properties.getCreator(PrefixManager.get(PrefixTypes.GS1CompanyPrefix, identifier.substring(0, !identifier.startsWith("0") ? PrefixValidator.GS1_COMPANY_PREFIX_MINIMUM_LENGTH : PrefixValidator.UPC_COMPANY_PREFIX_MINIMUM_LENGTH + 1))).concatenate(identifier, formData.serialComponent);
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
