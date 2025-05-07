import type {
    NonGTINNumericIdentificationKeyCreator,
    NonGTINNumericIdentificationKeyValidator
} from "@aidc-toolkit/gs1";
import type * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";

/**
 * Form properties.
 */
export type FormProperties<TNonGTINNumericIdentificationKeyValidator extends NonGTINNumericIdentificationKeyValidator = NonGTINNumericIdentificationKeyValidator, TNonGTINNumericIdentificationKeyCreator extends TNonGTINNumericIdentificationKeyValidator & NonGTINNumericIdentificationKeyCreator = TNonGTINNumericIdentificationKeyValidator & NonGTINNumericIdentificationKeyCreator> = NumericIdentificationKey.FormProperties<TNonGTINNumericIdentificationKeyValidator, TNonGTINNumericIdentificationKeyCreator>;
