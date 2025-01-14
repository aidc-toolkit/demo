import { CharacterSetCreator, Exclusion } from "@aidc-toolkit/utility";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";

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
interface ExclusionInputProperties<TExclusion extends Exclusion> extends Demo.HintInputProperties<Exclusion.None | TExclusion> {
    /**
     * Exclusion support.
     */
    readonly exclusionSupport: ReadonlyArray<Exclusion.None | TExclusion>;
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
export function ExclusionInput<TExclusion extends Exclusion>(properties: ExclusionInputProperties<TExclusion>): ReactElement {
    return <Demo.EnumInput
        {...properties}
        name="exclusion"
        label={i18nextDemo.t("String.exclusionLabel")}
        values={properties.exclusionSupport.includes(Exclusion.None) ? properties.exclusionSupport : [Exclusion.None, ...properties.exclusionSupport]}
        names={[
            i18nextDemo.t("String.exclusionNoneLabel"),
            i18nextDemo.t("String.exclusionFirstZeroLabel"),
            i18nextDemo.t("String.exclusionAllNumericLabel")
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
        label={i18nextDemo.t("String.lengthLabel")}
        hint={i18nextDemo.t("String.lengthHint", {
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
        label={i18nextDemo.t("String.valueLabel")}
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
            label={i18nextDemo.t("String.startValueLabel")}
            type="number"
            isRequired={true}
        />
        <Demo.TextInput
            {...properties.count}
            name="count"
            label={i18nextDemo.t("String.countLabel")}
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
        label={i18nextDemo.t("String.tweakLabel")}
        hint={i18nextDemo.t("String.tweakHint")}
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
    readonly characterSetResourceName: ParseKeys;

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
        title={i18nextDemo.t("String.characterSetTitle", {
            name: i18nextDemo.t(properties.characterSetResourceName)
        })}
    />;
}
