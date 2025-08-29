import { Exclusion } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import { EnumInput } from "../EnumInput.tsx";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";

/**
 * Exclusion input properties.
 */
interface ExclusionInputProperties<TExclusion extends Exclusion> extends Pick<InputProperties<Exclusion.None | TExclusion>, "hint" | "onProcess"> {
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
    return <EnumInput
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
