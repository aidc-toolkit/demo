import { PrefixManager } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NonNumericIdentificationKeyFormProperties } from "./NonNumericIdentificationKey.tsx";
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
 * Create non-numeric identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NonNumericCreateForm(properties: NonNumericIdentificationKeyFormProperties): ReactElement {
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
        return properties.getCreator(PrefixManager.get(formData.prefixType, formData.prefix)).create(formData.reference);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NonNumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
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
