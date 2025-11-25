import type { NumericIdentifierCreator, NumericIdentifierValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm.tsx";

/**
 * Form properties.
 */
export type FormProperties<TNumericIdentifierValidator extends NumericIdentifierValidator = NumericIdentifierValidator, TNumericIdentifierCreator extends TNumericIdentifierValidator & NumericIdentifierCreator = TNumericIdentifierValidator & NumericIdentifierCreator> = IdentifierFormProperties<TNumericIdentifierValidator, TNumericIdentifierCreator>;
