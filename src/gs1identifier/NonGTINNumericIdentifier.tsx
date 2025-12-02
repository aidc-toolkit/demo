import type {
    NonGTINNumericIdentifierCreator,
    NonGTINNumericIdentifierType,
    NonGTINNumericIdentifierValidator
} from "@aidc-toolkit/gs1";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier";

/**
 * Form properties.
 */
export type FormProperties<TNonGTINNumericIdentifierType extends NonGTINNumericIdentifierType, TNonGTINNumericIdentifierValidator extends NonGTINNumericIdentifierValidator<TNonGTINNumericIdentifierType> = NonGTINNumericIdentifierValidator<TNonGTINNumericIdentifierType>, TNonGTINNumericIdentifierCreator extends TNonGTINNumericIdentifierValidator & NonGTINNumericIdentifierCreator = TNonGTINNumericIdentifierValidator & NonGTINNumericIdentifierCreator> = NumericIdentifierFormProperties<TNonGTINNumericIdentifierType, TNonGTINNumericIdentifierValidator, TNonGTINNumericIdentifierCreator>;
