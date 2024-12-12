import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import * as IdentificationKey from "./IdentificationKey.tsx";
import type * as NonNumericIdentificationKey from "./NonNumericIdentificationKey.tsx";

/**
 * Create non-numeric identification key form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function NonNumericCreateForm(properties: NonNumericIdentificationKey.FormProperties): ReactElement {
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

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={NonNumericCreateForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <IdentificationKey.PrefixTypeAndPrefixInput
            identificationKeyType={properties.identificationKeyType}
            isValidate={false}
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
        <Demo.TextInput
            name="reference"
            label={i18nextDemo.t("GS1.referenceLabel")}
            hint={i18nextDemo.t("GS1.referenceHint")}
            type="string"
            isRequired={true}
            onProcess={(inputValue) => {
                reference = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

NonNumericCreateForm.resourceName = "String.createSubtitle" as ParseKeys;
