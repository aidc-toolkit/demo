import type { GTINCreator, GTINValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier";

/**
 * Form properties.
 */
export type FormProperties = NumericIdentifierFormProperties<GTINValidator, GTINCreator>;
