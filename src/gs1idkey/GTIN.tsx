import type { GTINCreator, GTINValidator } from "@aidc-toolkit/gs1";
import type * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";

/**
 * Form properties.
 */
export type FormProperties = NumericIdentificationKey.FormProperties<GTINValidator, GTINCreator>;
