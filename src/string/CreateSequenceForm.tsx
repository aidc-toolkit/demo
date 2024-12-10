import { type Exclusion, Sequencer } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import i18next, { demoNS } from "../locale/i18n.ts";
import { confirmCreateStrings } from "../utility.ts";
import * as String from "./String.tsx";

/**
 * Create string sequence form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function CreateSequenceForm(properties: String.FormProperties): ReactElement {
    let length: number;
    let startValue: number;
    let count: number;
    let exclusion: Exclusion;
    let tweak: number | undefined;

    /**
     * Process the form.
     *
     * @returns
     * Created strings or undefined if cancelled by user.
     */
    function onProcess(): Iterable<string> | undefined {
        return confirmCreateStrings(count, () => properties.creator.create(length, new Sequencer(startValue, count), exclusion, tweak));
    }

    return <String.BaseForm
        {...properties}
        subtitleResourceName={CreateSequenceForm.resourceName}
        onProcess={onProcess}
    >
        <String.LengthInput
            onProcess={(inputValue) => {
                length = inputValue;
            }}
        />
        <String.StartValueAndCountInput
            startValue={{
                hint: i18next.t("String.startValueHint", {
                    ns: demoNS,
                    name: i18next.t(properties.resourceName, {
                        ns: demoNS
                    })
                }),
                onProcess: (inputValue) => {
                    startValue = inputValue;
                }
            }}
            count={{
                hint: i18next.t("String.countHint", {
                    ns: demoNS,
                    name: i18next.t(properties.resourceName, {
                        ns: demoNS
                    })
                }),
                onProcess: (inputValue) => {
                    count = inputValue;
                }
            }}
        />
        <String.ExclusionInput
            hint={i18next.t("String.exclusionHint", {
                ns: demoNS
            })}
            exclusionSupport={properties.creator.exclusionSupport}
            onProcess={(inputValue) => {
                exclusion = inputValue;
            }}
        />
        <String.TweakInput
            onProcess={(inputValue) => {
                tweak = inputValue;
            }}
        />
    </String.BaseForm>;
}

CreateSequenceForm.resourceName = "String.createSequenceSubtitle";
