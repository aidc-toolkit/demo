import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import { Sequence } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import { type ReactElement, useState } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { StartValueAndCountInput } from "../string/StartValueAndCountInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";
import { PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";
import { SparseInput } from "./SparseInput.tsx";

/**
 * Create numeric identification keys form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NumericCreateSequenceForm(properties: NumericIdentificationKeyFormProperties): ReactElement {
    let prefixType: PrefixType;
    let prefix: string;
    let startValue: number;
    let count: number;
    let sparse: boolean;

    const [resultCount, setResultCount] = useState(0);

    /**
     * Process the form.
     *
     * @returns
     * Created identification keys.
     */
    function onProcess(): Iterable<string> {
        setResultCount(count);

        return properties.getCreator(PrefixManager.get(prefixType, prefix)).create(new Sequence(startValue, count), sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NumericCreateSequenceForm.resourceName}
        onProcess={onProcess}
        resultCount={resultCount}
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
        <StartValueAndCountInput
            startValue={{
                hint: i18nextDemo.t("GS1.startValueHint"),
                onProcess: (inputValue) => {
                    startValue = inputValue;
                }
            }}
            count={{
                hint: i18nextDemo.t("GS1.countHint"),
                onProcess: (inputValue) => {
                    count = inputValue;
                }
            }}
        />
        <SparseInput
            onProcess={(inputValue) => {
                sparse = inputValue;
            }}
        />
    </BaseForm>;
}

NumericCreateSequenceForm.resourceName = "String.createSequenceSubtitle" as ParseKeys;
