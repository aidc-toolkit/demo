import type {
    NumericIdentifierCreator,
    NumericIdentifierType,
    NumericIdentifierValidation,
    NumericIdentifierValidator
} from "@aidc-toolkit/gs1";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm";

/**
 * Form properties.
 */
export type FormProperties<TNumericIdentifierType extends NumericIdentifierType, TNumericIdentifierValidator extends NumericIdentifierValidator<TNumericIdentifierType> = NumericIdentifierValidator<TNumericIdentifierType>, TNumericIdentifierCreator extends TNumericIdentifierValidator & NumericIdentifierCreator<TNumericIdentifierType> = TNumericIdentifierValidator & NumericIdentifierCreator<TNumericIdentifierType>> = IdentifierFormProperties<TNumericIdentifierType, NumericIdentifierValidation, TNumericIdentifierValidator, TNumericIdentifierCreator>;
