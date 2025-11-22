import { PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import { type ReactElement, useState } from "react";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData;

/**
 * Create all numeric identification keys form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NumericCreateAllForm(properties: NumericIdentificationKeyFormProperties): ReactElement {
    const [resultCount, setResultCount] = useState(0);

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * All identification keys for prefix.
     */
    function onProcess(formData: FormData): Iterable<string> {
        const creator = properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix));

        setResultCount(creator.capacity);

        return creator.createAll();
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NumericCreateAllForm.resourceName}
        onProcess={onProcess}
        resultCount={resultCount}
        resultName="identificationKey"
    >
        <PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            excludePrefix={false}
        />
    </BaseForm>;
}

NumericCreateAllForm.resourceName = "GS1.createAllSubtitle" as ParseKeys;
