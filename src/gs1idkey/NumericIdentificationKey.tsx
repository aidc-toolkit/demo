import type { NumericIdentificationKeyCreator, NumericIdentificationKeyValidator } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import * as Demo from "../Demo.tsx";
import i18next, { demoNS } from "../locale/i18n.ts";
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
        label={i18next.t("GS1.sparseLabel", {
            ns: demoNS
        })}
        hint={i18next.t("GS1.sparseHint", {
            ns: demoNS
        })}
    />;
}

/**
 * Form properties.
 */
export type FormProperties<V extends NumericIdentificationKeyValidator = NumericIdentificationKeyValidator, C extends V & NumericIdentificationKeyCreator = V & NumericIdentificationKeyCreator> = IdentificationKey.FormProperties<V, C>;
