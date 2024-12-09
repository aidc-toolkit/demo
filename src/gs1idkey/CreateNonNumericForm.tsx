import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import i18next, { demoNS } from "../locale/i18n.ts";
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
export function CreateNonNumericForm(properties: NonNumericIdentificationKey.FormProperties): ReactElement {
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
        resourceName={CreateNonNumericForm.resourceName}
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
            label={i18next.t("GS1.referenceLabel", {
                ns: demoNS
            })}
            hint={i18next.t("GS1.referenceHint", {
                ns: demoNS
            })}
            type="string"
            isRequired={true}
            onProcess={(inputValue) => {
                reference = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

CreateNonNumericForm.resourceName = "String.createSubtitle";
