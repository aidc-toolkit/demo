import { type Exclusion, Exclusions } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.js";
import { i18nextDemoT } from "../locale/i18n.js";
import { RadioInput } from "../RadioInput.jsx";

/**
 * Exclusion data.
 */
export interface ExclusionData<TExclusion extends Exclusion = Exclusion> {
    /**
     * Exclusion.
     */
    exclusion: TExclusion;
}

/**
 * Exclusion input properties.
 */
interface ExclusionInputProperties<TFormData extends object> extends Pick<InputProperties<TFormData, Exclusion>, "hint"> {
    /**
     * Exclusion support.
     */
    readonly exclusionSupport: readonly Exclusion[];
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
export function ExclusionInput<TFormData extends ExclusionData>(properties: ExclusionInputProperties<TFormData>): ReactElement {
    return <RadioInput
        {...properties}
        type="number"
        name="exclusion"
        label={i18nextDemoT("String.exclusionLabel")}
        values={properties.exclusionSupport.includes(Exclusions.None) ? properties.exclusionSupport : [Exclusions.None, ...properties.exclusionSupport]}
        names={[
            i18nextDemoT("String.exclusionNoneLabel"),
            i18nextDemoT("String.exclusionFirstZeroLabel"),
            i18nextDemoT("String.exclusionAllNumericLabel")
        ]}
    />;
}
