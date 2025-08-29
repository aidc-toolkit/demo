import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";
import { BaseForm } from "./BaseForm.tsx";
import type { FormProperties as NonNumericIdentificationKeyFormProperties } from "./NonNumericIdentificationKey.tsx";
import { PrefixTypeAndPrefixInput } from "./PrefixTypeAndPrefixInput.tsx";

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
    let prefixType: PrefixType;
    let prefix: string;
    let reference: string;

    /**
     * Process the form.
     *
     * @returns
     * Created identification key.
     */
    function onProcess(): string {
        return properties.getCreator(PrefixManager.get(prefixType, prefix)).create(reference);
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={NonNumericCreateForm.resourceName}
        onProcess={onProcess}
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
        <TextInput
            name="reference"
            label={i18nextDemo.t("GS1.referenceLabel")}
            hint={i18nextDemo.t("GS1.referenceHint")}
            type="string"
            isRequired
            onProcess={(inputValue) => {
                reference = inputValue;
            }}
        />
    </BaseForm>;
}

NonNumericCreateForm.resourceName = "String.createSubtitle" as ParseKeys;
