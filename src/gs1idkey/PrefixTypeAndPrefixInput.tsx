import { gs1NS, IdentificationKeyType, PrefixType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { EnumInput } from "../EnumInput.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";

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
     * Identification key type.
     */
    readonly identificationKeyType: IdentificationKeyType;

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

    if (properties.excludePrefix && properties.identificationKeyType !== IdentificationKeyType.GTIN) {
        // GTIN has validations specific to the prefix type.
        prefixTypes = [PrefixType.GS1CompanyPrefix];
    } else if (properties.identificationKeyType === IdentificationKeyType.GTIN) {
        // Only GTIN supports GS1-8 Prefix.
        prefixTypes = [PrefixType.GS1CompanyPrefix, PrefixType.UPCCompanyPrefix, PrefixType.GS18Prefix];
    } else {
        prefixTypes = [PrefixType.GS1CompanyPrefix, PrefixType.UPCCompanyPrefix];
    }

    return <>
        <EnumInput
            name="prefixType"
            label={i18nextDemo.t("GS1.prefixTypeLabel")}
            hint={i18nextDemo.t("GS1.prefixTypeHint")}
            enumValues={prefixTypes}
            names={[
                i18nextDemo.t("Prefix.gs1CompanyPrefix", {
                    ns: gs1NS
                }),
                i18nextDemo.t("Prefix.upcCompanyPrefix", {
                    ns: gs1NS
                }),
                i18nextDemo.t("Prefix.gs18Prefix", {
                    ns: gs1NS
                })
            ]}
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
