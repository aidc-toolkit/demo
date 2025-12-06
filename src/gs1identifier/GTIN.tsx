import type { IdentifierTypes } from "@aidc-toolkit/gs1";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier.jsx";

/**
 * Form properties.
 */
export type FormProperties = NumericIdentifierFormProperties<typeof IdentifierTypes.GTIN>;
