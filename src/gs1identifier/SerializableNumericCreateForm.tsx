import { PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import type { ValueData } from "../string/ValueInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";
import { type SerialComponentData, SerialComponentInput } from "./SerialComponentInput.tsx";
import type {
    FormProperties as SerializableNumericIdentifierFormProperties
} from "./SerializableNumericIdentifier.tsx";
import { type SparseData, SparseInput } from "./SparseInput.tsx";
import { ValueInput } from "./ValueInput.tsx";

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData & ValueData & SparseData & SerialComponentData;

/**
 * Create serializable numeric identifier form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SerializableNumericCreateForm(properties: SerializableNumericIdentifierFormProperties): ReactElement {
    /**
     * Process the form.
     * 
     * @param formData
     * Form data.
     *
     * @returns
     * Created identifier.
     */
    function onProcess(formData: FormData): string {
        return properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix)).createSerialized(formData.value, formData.serialComponent, formData.sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={SerializableNumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identifier"
    >
        <PrefixTypeAndPrefixInput
            identifierType={properties.identifierType}
            excludePrefix={false}
        />
        <ValueInput />
        <SparseInput />
        <SerialComponentInput />
    </BaseForm>;
}

SerializableNumericCreateForm.resourceName = "GS1.createSerializedSubtitle" as ParseKeys;
