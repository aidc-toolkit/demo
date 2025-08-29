import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";
import { PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";
import { SparseInput } from "./SparseInput.tsx";
import { ValueInput } from "./ValueInput.tsx";

/**
 * Create numeric identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NumericCreateForm(properties: NumericIdentificationKeyFormProperties): ReactElement {
    let prefixType: PrefixType;
    let prefix: string;
    let value: number;
    let sparse: boolean;

    /**
     * Process the form.
     *
     * @returns
     * Created identification key.
     */
    function onProcess(): string {
        return properties.getCreator(PrefixManager.get(prefixType, prefix)).create(value, sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NumericCreateForm.resourceName}
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
    </BaseForm>;
}

NumericCreateForm.resourceName = "String.createSubtitle" as ParseKeys;
