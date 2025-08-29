import type { GTINCreator, GTINValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";

/**
 * Form properties.
 */
export type FormProperties = NumericIdentificationKeyFormProperties<GTINValidator, GTINCreator>;
