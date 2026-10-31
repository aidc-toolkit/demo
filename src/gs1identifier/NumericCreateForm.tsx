import { type NumericIdentifierType, PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import type { ValueData } from "../string/ValueInput.jsx";
import { BaseForm } from "./BaseForm.jsx";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier.jsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.jsx";
import { type SparseData, SparseInput } from "./SparseInput.jsx";
import { ValueInput } from "./ValueInput.jsx";

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData & ValueData & SparseData;

/**
 * Create numeric identifier form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NumericCreateForm<TNumericIdentifierType extends NumericIdentifierType>(properties: NumericIdentifierFormProperties<TNumericIdentifierType>): ReactElement {
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
        return properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix)).create(formData.value, formData.sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identifier"
    >
        <PrefixTypeAndPrefixInput
            identifierType={properties.identifierType}
            excludePrefix={false}
        />
        <ValueInput />
        <SparseInput />
    </BaseForm>;
}

NumericCreateForm.resourceName = "String.createSubtitle" as ParseKeys;
