import type { NonGTINNumericIdentifierCreator, NonGTINNumericIdentifierValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier";

/**
 * Form properties.
 */
export type FormProperties<TNonGTINNumericIdentifierValidator extends NonGTINNumericIdentifierValidator = NonGTINNumericIdentifierValidator, TNonGTINNumericIdentifierCreator extends TNonGTINNumericIdentifierValidator & NonGTINNumericIdentifierCreator = TNonGTINNumericIdentifierValidator & NonGTINNumericIdentifierCreator> = NumericIdentifierFormProperties<TNonGTINNumericIdentifierValidator, TNonGTINNumericIdentifierCreator>;
