import { PrefixManager, PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { BaseForm } from "./BaseForm.tsx";
import { type IdentificationKeyData, IdentificationKeyInput } from "./IdentificationKeyInput.tsx";
import { type SerialComponentData, SerialComponentInput } from "./SerialComponentInput.tsx";
import type {
    FormProperties as SerializableNumericIdentificationKeyFormProperties
} from "./SerializableNumericIdentificationKey.tsx";

/**
 * Form data.
 */
type FormData = IdentificationKeyData & SerialComponentData;

/**
 * Concatenate a base identification key with a serial component form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SerializableNumericConcatenateForm(properties: SerializableNumericIdentificationKeyFormProperties): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     * 
     * @returns
     * Concatenated identification key.
     */
    function onProcess(formData: FormData): string {
        return properties.getCreator(PrefixManager.get(PrefixType.GS1CompanyPrefix, "9521234")).concatenate(formData.identificationKey, formData.serialComponent);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={SerializableNumericConcatenateForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <IdentificationKeyInput
            identificationKeyType={properties.identificationKeyType}
            label={i18nextDemo.t("GS1.baseIdentificationKeyLabel", {
                identificationKeyType: properties.identificationKeyType
            })}
            hint={i18nextDemo.t("GS1.baseIdentificationKeyHint", {
                identificationKeyType: properties.identificationKeyType
            })}
        />
        <SerialComponentInput />
    </BaseForm>;
}

SerializableNumericConcatenateForm.resourceName = "GS1.concatenateSerializedSubtitle" as ParseKeys;
