import type { ReactElement } from "react";
import { BooleanInput } from "../BooleanInput.jsx";
import { i18nextDemoT } from "../locale/i18n.js";

/**
 * Sparse data.
 */
export interface SparseData {
    /**
     * Sparse.
     */
    sparse: boolean;
}

/**
 * Sparse input. Renders a boolean control with name "sparse".
 *
 * @returns
 * React element.
 */
export function SparseInput(): ReactElement {
    return <BooleanInput
        name="sparse"
        label={i18nextDemoT("GS1.sparseLabel")}
        hint={i18nextDemoT("GS1.sparseHint")}
    />;
}
