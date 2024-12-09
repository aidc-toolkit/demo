import type {
    NonGTINNumericIdentificationKeyCreator,
    NonGTINNumericIdentificationKeyValidator
} from "@aidc-toolkit/gs1";
import type * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";

/**
 * Form properties.
 */
export type FormProperties<V extends NonGTINNumericIdentificationKeyValidator = NonGTINNumericIdentificationKeyValidator, C extends V & NonGTINNumericIdentificationKeyCreator = V & NonGTINNumericIdentificationKeyCreator> = NumericIdentificationKey.FormProperties<V, C>;
