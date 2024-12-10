import { PrefixManager, type PrefixType } from "@aidc-toolkit/gs1";
import { Sequencer } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import i18next, { demoNS } from "../locale/i18n.ts";
import * as String from "../string/String.tsx";
import { confirmCreateStrings } from "../utility.ts";
import * as IdentificationKey from "./IdentificationKey.tsx";
import * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";

/**
 * Create numeric identification keys form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateSequenceNumericForm(properties: NumericIdentificationKey.FormProperties): ReactElement {
    let prefixType: PrefixType;
    let prefix: string;
    let startValue: number;
    let count: number;
    let sparse: boolean;

    /**
     * Process the form.
     *
     * @returns
     * Created identification keys or undefined if cancelled by user.
     */
    function onProcess(): Iterable<string> | undefined {
        return confirmCreateStrings(count, () => properties.getCreator(PrefixManager.get(prefixType, prefix)).create(new Sequencer(startValue, count), sparse));
    }

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={CreateSequenceNumericForm.resourceName}
        onProcess={onProcess}
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
        <String.StartValueAndCountInput
            startValue={{
                hint: i18next.t("GS1.startValueHint", {
                    ns: demoNS
                }),
                onProcess: (inputValue) => {
                    startValue = inputValue;
                }
            }}
            count={{
                hint: i18next.t("GS1.countHint", {
                    ns: demoNS
                }),
                onProcess: (inputValue) => {
                    count = inputValue;
                }
            }}
        />
        <NumericIdentificationKey.SparseInput
            onProcess={(inputValue) => {
                sparse = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

CreateSequenceNumericForm.resourceName = "String.createSequenceSubtitle";
