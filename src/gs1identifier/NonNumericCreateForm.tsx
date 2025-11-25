import { PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NonNumericIdentifierFormProperties } from "./NonNumericIdentifier.tsx";
import { type PrefixTypeAndPrefixData, PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";

/**
 * Form data.
 */
interface FormData extends PrefixTypeAndPrefixData {
    /**
     * Reference.
     */
    reference: string;
}

/**
 * Create non-numeric identifier form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NonNumericCreateForm(properties: NonNumericIdentifierFormProperties): ReactElement {
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
        return properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix)).create(formData.reference);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NonNumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identifier"
    >
        <PrefixTypeAndPrefixInput
            identifierType={properties.identifierType}
            excludePrefix={false}
        />
        <TextInput
            name="reference"
            label={i18nextDemo.t("GS1.referenceLabel")}
            hint={i18nextDemo.t("GS1.referenceHint")}
            type="string"
            isRequired
        />
    </BaseForm>;
}

NonNumericCreateForm.resourceName = "String.createSubtitle" as ParseKeys;
