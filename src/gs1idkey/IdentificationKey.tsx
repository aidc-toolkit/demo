import {
    gs1NS,
    type GTINValidator,
    type IdentificationKeyCreator,
    IdentificationKeyType,
    type IdentificationKeyValidator,
    type PrefixManager,
    PrefixType
} from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import * as String from "../string/String.tsx";

/**
 * Prefix type and prefix input properties.
 */
interface PrefixTypeAndPrefixInputProperties<IsValidate extends boolean> {
    /**
     * Identification key type.
     */
    readonly identificationKeyType: IdentificationKeyType;

    /**
     * If true, form is a validate form and prefix input is not required.
     */
    readonly isValidate: IsValidate;

    /**
     * Prefix type input properties.
     */
    readonly prefixType: Demo.InputProperties<PrefixType>;
}

/**
 * Prefix type and prefix input properties for validate form.
 */
interface PrefixTypeAndPrefixValidateInputProperties extends PrefixTypeAndPrefixInputProperties<true> {
}

/**
 * Prefix type and prefix input properties for create form.
 */
interface PrefixTypeAndPrefixCreateInputProperties extends PrefixTypeAndPrefixInputProperties<false> {
    /**
     * Prefix input properties.
     */
    readonly prefix: Demo.InputProperties<string>;
}

/**
 * Prefix type and prefix input. Renders an enumeration control with name "prefixType" and optionally a required
 * string text control with name "prefix".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function PrefixTypeAndPrefixInput<IsValidate extends boolean>(properties: IsValidate extends true ? PrefixTypeAndPrefixValidateInputProperties : PrefixTypeAndPrefixCreateInputProperties): ReactElement {
    let prefixTypes: PrefixType[];

    if (properties.isValidate && properties.identificationKeyType !== IdentificationKeyType.GTIN) {
        prefixTypes = [PrefixType.GS1CompanyPrefix];
    } else if (properties.identificationKeyType === IdentificationKeyType.GTIN) {
        // Only GTIN supports GS1-8 Prefix.
        prefixTypes = [PrefixType.GS1CompanyPrefix, PrefixType.UPCCompanyPrefix, PrefixType.GS18Prefix];
    } else {
        prefixTypes = [PrefixType.GS1CompanyPrefix, PrefixType.UPCCompanyPrefix];
    }

    return <>
        <Demo.EnumInput
            {...properties.prefixType}
            name="prefixType"
            label={i18nextDemo.t("GS1.prefixTypeLabel")}
            hint={i18nextDemo.t("GS1.prefixTypeHint")}
            values={prefixTypes}
            names={[i18nextDemo.t("Prefix.gs1CompanyPrefix", {
                ns: gs1NS
            }), i18nextDemo.t("Prefix.upcCompanyPrefix", {
                ns: gs1NS
            }), i18nextDemo.t("Prefix.gs18Prefix", {
                ns: gs1NS
            })]}
        />
        {
            properties.isValidate ?
                <></> :
                <Demo.TextInput
                    {...properties.prefix}
                    name="prefix"
                    label={i18nextDemo.t("GS1.prefixLabel")}
                    hint={i18nextDemo.t("GS1.prefixHint")}
                    type="string"
                    isRequired={true}
                />
        }
    </>;
}

/**
 * Identification key input properties.
 */
interface IdentificationKeyInputProperties extends Demo.InputProperties<string> {
    /**
     * Identification key type.
     */
    readonly identificationKeyType: IdentificationKeyType;

    /**
     * Label.
     */
    readonly label?: string;

    /**
     * Hint to user.
     */
    readonly hint?: string;
}

/**
 * Identification key input. Renders a required string text control with name "identificationKey".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function IdentificationKeyInput(properties: IdentificationKeyInputProperties): ReactElement {
    return <Demo.TextInput
        {...properties}
        name="identificationKey"
        label={properties.label ?? properties.identificationKeyType}
        hint={properties.hint ?? i18nextDemo.t("GS1.identificationKeyHint", {
            identificationKeyType: properties.identificationKeyType
        })}
        type="string"
        isRequired={true}
    />;
}

/**
 * Value input properties.
 */
interface ValueInputProperties extends Demo.InputProperties<number> {
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
    return <String.ValueInput
        {...properties}
        hint={i18nextDemo.t("GS1.valueHint")}
    />;
}

/**
 * Form properties. All identification key forms require these properties to be set.
 */
export interface FormProperties<V extends IdentificationKeyValidator = IdentificationKeyValidator, C extends V & IdentificationKeyCreator = V & IdentificationKeyCreator> {
    /**
     * Identification key type.
     */
    readonly identificationKeyType: IdentificationKeyType;

    /**
     * Validators (GTIN) or validator (non-GTIN).
     */
    readonly validatorOrValidators: V extends GTINValidator ? V[] : V;

    /**
     * Get creator from prefix manager.
     *
     * @param prefixManager
     * Prefix manager.
     *
     * @returns
     * Identification key creator.
     */
    readonly getCreator: (prefixManager: PrefixManager) => C;
}

/**
 * Base form properties.
 */
interface BaseFormProperties<V extends IdentificationKeyValidator, C extends V & IdentificationKeyCreator> extends Demo.FormProperties, FormProperties<V, C> {
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
export function BaseForm<V extends IdentificationKeyValidator, C extends V & IdentificationKeyCreator>(properties: BaseFormProperties<V, C>): ReactElement {
    return <Demo.BaseForm
        {...properties}
        title={properties.identificationKeyType}
    />;
}
