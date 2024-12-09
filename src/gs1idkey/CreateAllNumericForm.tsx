import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { confirmCreateStrings } from "../utility.ts";
import * as IdentificationKey from "./IdentificationKey.tsx";
import type * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";

/**
 * Create all numeric identification keys form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateAllNumericForm(properties: NumericIdentificationKey.FormProperties): ReactElement {
    let prefixType: PrefixType;
    let prefix: string;

    /**
     * Process the form.
     *
     * @returns
     * All identification keys for prefix or undefined if cancelled by user.
     */
    function onProcess(): IterableIterator<string> | undefined {
        const creator = properties.getCreator(PrefixManager.get(prefixType, prefix));

        return confirmCreateStrings(creator.capacity) ? creator.createAll() : undefined;
    }

    return <IdentificationKey.BaseForm
        {...properties}
        resourceName={CreateAllNumericForm.resourceName}
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
    </IdentificationKey.BaseForm>;
}

CreateAllNumericForm.resourceName = "GS1.createAllSubtitle";
