import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import * as IdentificationKey from "./IdentificationKey.tsx";
import * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";

/**
 * Create numeric identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NumericCreateForm(properties: NumericIdentificationKey.FormProperties): ReactElement {
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

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={NumericCreateForm.resourceName}
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
    </IdentificationKey.BaseForm>;
}

NumericCreateForm.resourceName = "String.createSubtitle" as ParseKeys;
