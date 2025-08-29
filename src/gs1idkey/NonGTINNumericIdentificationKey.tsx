import type {
    NonGTINNumericIdentificationKeyCreator,
    NonGTINNumericIdentificationKeyValidator
} from "@aidc-toolkit/gs1";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";

/**
 * Form properties.
 */
export type FormProperties<TNonGTINNumericIdentificationKeyValidator extends NonGTINNumericIdentificationKeyValidator = NonGTINNumericIdentificationKeyValidator, TNonGTINNumericIdentificationKeyCreator extends TNonGTINNumericIdentificationKeyValidator & NonGTINNumericIdentificationKeyCreator = TNonGTINNumericIdentificationKeyValidator & NonGTINNumericIdentificationKeyCreator> = NumericIdentificationKeyFormProperties<TNonGTINNumericIdentificationKeyValidator, TNonGTINNumericIdentificationKeyCreator>;
