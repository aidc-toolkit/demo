import type { ReactElement } from "react";
import { BooleanInput } from "../BooleanInput.tsx";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";

/**
 * Sparse input. Renders a boolean control with name "sparse".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SparseInput(properties: Pick<InputProperties<boolean>, "onProcess">): ReactElement {
    return <BooleanInput
        {...properties}
        name="sparse"
        label={i18nextDemo.t("GS1.sparseLabel")}
        hint={i18nextDemo.t("GS1.sparseHint")}
    />;
}
