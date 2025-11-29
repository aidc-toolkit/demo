import { PrefixManager } from "@aidc-toolkit/gs1";
import { Sequence } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import { type ReactElement, useState } from "react";
import { i18nextDemo } from "../locale/i18n";
import { type StartValueAndCountData, StartValueAndCountInput } from "../string/StartValueAndCountInput";
import { BaseForm } from "./BaseForm";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput";
import { type SparseData, SparseInput } from "./SparseInput";

/**
 * Form data.
 */
type FormData = PrefixTypeAndPrefixData & StartValueAndCountData & SparseData;

/**
 * Create numeric identifiers form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NumericCreateSequenceForm(properties: NumericIdentifierFormProperties): ReactElement {
    const [resultCount, setResultCount] = useState(0);

    /**
     * Process the form.
     * 
     * @param formData
     * Form data.
     *
     * @returns
     * Created identifiers.
     */
    function onProcess(formData: FormData): Iterable<string> {
        setResultCount(formData.count);

        return properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix)).create(new Sequence(formData.startValue, formData.count), formData.sparse);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NumericCreateSequenceForm.resourceName}
        onProcess={onProcess}
        resultCount={resultCount}
    >
        <PrefixTypeAndPrefixInput
            identifierType={properties.identifierType}
            excludePrefix={false}
        />
        <StartValueAndCountInput
            startValue={{
                hint: i18nextDemo.t("GS1.startValueHint")
            }}
            count={{
                hint: i18nextDemo.t("GS1.countHint")
            }}
        />
        <SparseInput />
    </BaseForm>;
}

NumericCreateSequenceForm.resourceName = "String.createSequenceSubtitle" as ParseKeys;
