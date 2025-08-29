import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import { type ReactElement, useState } from "react";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";
import { PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";

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
    let prefixType: PrefixType;
    let prefix: string;

    const [resultCount, setResultCount] = useState(0);

    /**
     * Process the form.
     *
     * @returns
     * All identification keys for prefix.
     */
    function onProcess(): Iterable<string> {
        const creator = properties.getCreator(PrefixManager.get(prefixType, prefix));

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
    </BaseForm>;
}

NumericCreateAllForm.resourceName = "GS1.createAllSubtitle" as ParseKeys;
