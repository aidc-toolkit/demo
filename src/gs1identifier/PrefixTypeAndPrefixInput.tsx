import { gs1NS, type IdentifierType, IdentifierTypes, type PrefixType, PrefixTypes } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n";
import { RadioInput } from "../RadioInput";
import { TextInput } from "../TextInput";

/**
 * Prefix type and prefix input data.
 */
export interface PrefixTypeAndPrefixData {
    /**
     * Prefix type.
     */
    prefixType: PrefixType;

    /**
     * Prefix.
     */
    prefix: string;
}

/**
 * Prefix type and prefix input properties.
 */
interface PrefixTypeAndPrefixInputProperties {
    /**
     * Identifier type.
     */
    readonly identifierType: IdentifierType;

    /**
     * If true, exclude prefix input.
     */
    readonly excludePrefix: boolean;
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
export function PrefixTypeAndPrefixInput(properties: PrefixTypeAndPrefixInputProperties): ReactElement {
    let prefixTypes: PrefixType[];

    if (properties.excludePrefix && properties.identifierType !== IdentifierTypes.GTIN) {
        // GTIN has validations specific to the prefix type.
        prefixTypes = [PrefixTypes.GS1CompanyPrefix];
    } else if (properties.identifierType === IdentifierTypes.GTIN) {
        // Only GTIN supports GS1-8 Prefix.
        prefixTypes = [PrefixTypes.GS1CompanyPrefix, PrefixTypes.UPCCompanyPrefix, PrefixTypes.GS18Prefix];
    } else {
        prefixTypes = [PrefixTypes.GS1CompanyPrefix, PrefixTypes.UPCCompanyPrefix];
    }

    return <>
        <RadioInput
            name="prefixType"
            label={i18nextDemo.t("GS1.prefixTypeLabel")}
            hint={i18nextDemo.t("GS1.prefixTypeHint")}
            type="string"
            values={prefixTypes}
            names={{
                [PrefixTypes.GS1CompanyPrefix]: i18nextDemo.t("Prefix.gs1CompanyPrefix", {
                    ns: gs1NS
                }),
                [PrefixTypes.UPCCompanyPrefix]: i18nextDemo.t("Prefix.upcCompanyPrefix", {
                    ns: gs1NS
                }),
                [PrefixTypes.GS18Prefix]: i18nextDemo.t("Prefix.gs18Prefix", {
                    ns: gs1NS
                })
            }}
        />
        {
            properties.excludePrefix ?
                <></> :
                <TextInput
                    name="prefix"
                    label={i18nextDemo.t("GS1.prefixLabel")}
                    hint={i18nextDemo.t("GS1.prefixHint")}
                    type="string"
                    isRequired
                />
        }
    </>;
}
