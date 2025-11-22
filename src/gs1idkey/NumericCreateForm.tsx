import { PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import type { ValueData } from "../string/ValueInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";
import { type SparseData, SparseInput } from "./SparseInput.tsx";
import { ValueInput } from "./ValueInput.tsx";

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData & ValueData & SparseData;

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
        return properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix)).create(formData.value, formData.sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            excludePrefix={false}
        />
        <ValueInput />
        <SparseInput />
    </BaseForm>;
}

NumericCreateForm.resourceName = "String.createSubtitle" as ParseKeys;
