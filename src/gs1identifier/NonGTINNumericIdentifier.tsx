import type { NonGTINNumericIdentifierType } from "@aidc-toolkit/gs1";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier";

/**
 * Form properties.
 */
export type FormProperties<TNonGTINNumericIdentifierType extends NonGTINNumericIdentifierType> = NumericIdentifierFormProperties<TNonGTINNumericIdentifierType>;
