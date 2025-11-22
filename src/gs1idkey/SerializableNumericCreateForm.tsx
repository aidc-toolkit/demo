import { PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import type { ValueData } from "../string/ValueInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";
import { type SerialComponentData, SerialComponentInput } from "./SerialComponentInput.tsx";
import type {
    FormProperties as SerializableNumericIdentificationKeyFormProperties
} from "./SerializableNumericIdentificationKey.tsx";
import { type SparseData, SparseInput } from "./SparseInput.tsx";
import { ValueInput } from "./ValueInput.tsx";

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData & ValueData & SparseData & SerialComponentData;

/**
 * Create serializable numeric identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SerializableNumericCreateForm(properties: SerializableNumericIdentificationKeyFormProperties): ReactElement {
    /**
     * Process the form.
     * 
     * @param formData
     * Form data.
     *
     * @returns
     * Created identification key.
     */
    function onProcess(formData: FormData): string {
        return properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix)).createSerialized(formData.value, formData.serialComponent, formData.sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={SerializableNumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            excludePrefix={false}
        />
        <ValueInput />
        <SparseInput />
        <SerialComponentInput />
    </BaseForm>;
}

SerializableNumericCreateForm.resourceName = "GS1.createSerializedSubtitle" as ParseKeys;
