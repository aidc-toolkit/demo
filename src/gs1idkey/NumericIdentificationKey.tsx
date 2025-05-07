import type { NumericIdentificationKeyCreator, NumericIdentificationKeyValidator } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import { i18nextDemo } from "../locale/i18n.ts";
import type * as IdentificationKey from "./IdentificationKey.tsx";

/**
 * Sparse input properties.
 */
interface SparseProperties extends Demo.InputProperties<boolean> {
}

/**
 * Sparse input. Renders a boolean control with name "sparse".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SparseInput(properties: SparseProperties): ReactElement {
    return <Demo.BooleanInput
        {...properties}
        name="sparse"
        label={i18nextDemo.t("GS1.sparseLabel")}
        hint={i18nextDemo.t("GS1.sparseHint")}
    />;
}

/**
 * Form properties.
 */
export type FormProperties<TNumericIdentificationKeyValidator extends NumericIdentificationKeyValidator = NumericIdentificationKeyValidator, TNumericIdentificationKeyCreator extends TNumericIdentificationKeyValidator & NumericIdentificationKeyCreator = TNumericIdentificationKeyValidator & NumericIdentificationKeyCreator> = IdentificationKey.FormProperties<TNumericIdentificationKeyValidator, TNumericIdentificationKeyCreator>;
