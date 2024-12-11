import { CharacterSetCreator, Exclusion } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import i18next, { demoNS } from "../locale/i18n.ts";

/**
 * S input properties.
 */
interface SInputProperties extends Demo.HintInputProperties<string | undefined> {
}

/**
 * S input. Renders an optional string text control with name "s".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SInput(properties: SInputProperties): ReactElement {
    return <Demo.TextInput
        {...properties}
        name="s"
        label={undefined}
        type="string"
        isRequired={false}
    />;
}

/**
 * Exclusion input properties.
 */
interface ExclusionInputProperties<T extends Exclusion> extends Demo.HintInputProperties<Exclusion.None | T> {
    /**
     * Exclusion support.
     */
    readonly exclusionSupport: ReadonlyArray<Exclusion.None | T>;
}

/**
 * Exclusion input. Renders an enumeration control with name "exclusion".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ExclusionInput<T extends Exclusion>(properties: ExclusionInputProperties<T>): ReactElement {
    return <Demo.EnumInput
        {...properties}
        name="exclusion"
        label={i18next.t("String.exclusionLabel", {
            ns: demoNS
        })}
        values={properties.exclusionSupport.includes(Exclusion.None) ? properties.exclusionSupport : [Exclusion.None, ...properties.exclusionSupport]}
        names={[
            i18next.t("String.exclusionNoneLabel", {
                ns: demoNS
            }),
            i18next.t("String.exclusionFirstZeroLabel", {
                ns: demoNS
            }),
            i18next.t("String.exclusionAllNumericLabel", {
                ns: demoNS
            })
        ]}
    />;
}

/**
 * Length input properties.
 */
interface LengthInputProperties extends Demo.InputProperties<number> {
}

/**
 * Length input. Renders a required number text control with name "length".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function LengthInput(properties: LengthInputProperties): ReactElement {
    return <Demo.TextInput
        {...properties}
        name="length"
        label={i18next.t("String.lengthLabel", {
            ns: demoNS
        })}
        hint={i18next.t("String.lengthHint", {
            ns: demoNS,
            maximumLength: CharacterSetCreator.MAXIMUM_STRING_LENGTH
        })}
        type="number"
        isRequired={true}
    />;
}

/**
 * Value input properties.
 */
interface ValueInputProperties extends Demo.HintInputProperties<number> {
}

/**
 * Value input. Renders a required number text control with name "value".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function ValueInput(properties: ValueInputProperties): ReactElement {
    return <Demo.TextInput
        {...properties}
        name="value"
        label={i18next.t("String.valueLabel", {
            ns: demoNS
        })}
        hint={properties.hint}
        type="number"
        isRequired={true}
    />;
}

/**
 * Start value and count input properties.
 */
interface StartValueAndCountInputProperties {
    /**
     * Start value properties.
     */
    startValue: Demo.HintInputProperties<number>;

    /**
     * Count properties.
     */
    count: Demo.HintInputProperties<number>;
}

/**
 * Start value and count input. Renders a required number text control with name "startValue" and a required number text
 * control with name "count".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function StartValueAndCountInput(properties: StartValueAndCountInputProperties): ReactElement {
    return <>
        <Demo.TextInput
            {...properties.startValue}
            name="startValue"
            label={i18next.t("String.startValueLabel", {
                ns: demoNS
            })}
            type="number"
            isRequired={true}
        />
        <Demo.TextInput
            {...properties.count}
            name="count"
            label={i18next.t("String.countLabel", {
                ns: demoNS
            })}
            type="number"
            isRequired={true}
        />
    </>;
}

/**
 * Tweak input properties.
 */
interface TweakInputProperties extends Demo.InputProperties<number | undefined> {
}

/**
 * Tweak input. Renders an optional number text control with name "tweak".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function TweakInput(properties: TweakInputProperties): ReactElement {
    return <Demo.TextInput
        {...properties}
        name="tweak"
        label={i18next.t("String.tweakLabel", {
            ns: demoNS
        })}
        hint={i18next.t("String.tweakHint", {
            ns: demoNS
        })}
        type="number"
        isRequired={false}
    />;
}

/**
 * Form properties. All string forms require these properties to be set.
 */
export interface FormProperties {
    /**
     * Character set resource name.
     */
    readonly characterSetResourceName: string;

    /**
     * Character set creator.
     */
    readonly creator: CharacterSetCreator;
}

/**
 * Base form properties.
 */
interface BaseFormProperties extends Demo.FormProperties, FormProperties {
}

/**
 * Base form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BaseForm(properties: BaseFormProperties): ReactElement {
    return <Demo.BaseForm
        {...properties}
        title={i18next.t("String.characterSetTitle", {
            ns: demoNS,
            name: i18next.t(properties.characterSetResourceName, {
                ns: demoNS
            })
        })}
    />;
}
