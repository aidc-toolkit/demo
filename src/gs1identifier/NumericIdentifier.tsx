import type { NumericIdentifierType } from "@aidc-toolkit/gs1";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm";

/**
 * Form properties.
 */
export type FormProperties<TNumericIdentifierType extends NumericIdentifierType> = IdentifierFormProperties<TNumericIdentifierType>;
