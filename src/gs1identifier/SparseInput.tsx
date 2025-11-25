import type { ReactElement } from "react";
import { BooleanInput } from "../BooleanInput.tsx";
import { i18nextDemo } from "../locale/i18n.ts";

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
        label={i18nextDemo.t("GS1.sparseLabel")}
        hint={i18nextDemo.t("GS1.sparseHint")}
    />;
}
