import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { BaseForm } from "./BaseForm.tsx";
import { PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";
import { SerialComponentInput } from "./SerialComponentInput.tsx";
import type {
    FormProperties as SerializableNumericIdentificationKeyFormProperties
} from "./SerializableNumericIdentificationKey.tsx";
import { SparseInput } from "./SparseInput.tsx";
import { ValueInput } from "./ValueInput.tsx";

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
    let prefixType: PrefixType;
    let prefix: string;
    let value: number;
    let sparse: boolean;
    let serialComponent: string;

    /**
     * Process the form.
     *
     * @returns
     * Created identification key.
     */
    function onProcess(): string {
        return properties.getCreator(PrefixManager.get(prefixType, prefix)).createSerialized(value, serialComponent, sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={SerializableNumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            prefixType={{
                onProcess: (inputValue) => {
                    prefixType = inputValue;
                }
            }}
            prefix={{
                onProcess: (inputValue) => {
                    prefix = inputValue;
                }
            }}
        />
        <ValueInput
            onProcess={(inputValue) => {
                value = inputValue;
            }}
        />
        <SparseInput
            onProcess={(inputValue) => {
                sparse = inputValue;
            }}
        />
        <SerialComponentInput
            onProcess={(inputValue) => {
                serialComponent = inputValue;
            }}
        />
    </BaseForm>;
}

SerializableNumericCreateForm.resourceName = "GS1.createSerializedSubtitle" as ParseKeys;
