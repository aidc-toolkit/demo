import type { NumericIdentifierType } from "@aidc-toolkit/gs1";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm.jsx";

/**
 * Form properties.
 */
export type FormProperties<TNumericIdentifierType extends NumericIdentifierType> = IdentifierFormProperties<TNumericIdentifierType>;
