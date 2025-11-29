import { PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import { type ReactElement, useState } from "react";
import { BaseForm } from "./BaseForm";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput";

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData;

/**
 * Create all numeric identifiers form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NumericCreateAllForm(properties: NumericIdentifierFormProperties): ReactElement {
    const [resultCount, setResultCount] = useState(0);

    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * All identifiers for prefix.
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
        resultName="identifier"
    >
        <PrefixTypeAndPrefixInput
            identifierType={properties.identifierType}
            excludePrefix={false}
        />
    </BaseForm>;
}

NumericCreateAllForm.resourceName = "GS1.createAllSubtitle" as ParseKeys;
