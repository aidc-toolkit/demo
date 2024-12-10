import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as IdentificationKey from "./IdentificationKey.tsx";
import * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";
import * as SerializableNumericIdentificationKey from "./SerializableNumericIdentificationKey.tsx";

/**
 * Create serializable numeric identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateSerializableNumericForm(properties: SerializableNumericIdentificationKey.FormProperties): ReactElement {
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

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={CreateSerializableNumericForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <IdentificationKey.PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            isValidate={false}
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
        <IdentificationKey.ValueInput
            onProcess={(inputValue) => {
                value = inputValue;
            }}
        />
        <NumericIdentificationKey.SparseInput
            onProcess={(inputValue) => {
                sparse = inputValue;
            }}
        />
        <SerializableNumericIdentificationKey.SerialComponentInput
            onProcess={(inputValue) => {
                serialComponent = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

CreateSerializableNumericForm.resourceName = "GS1.createSerializedSubtitle";
