import type { NumericIdentificationKeyCreator, NumericIdentificationKeyValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as IdentificationKeyFormProperties } from "./BaseForm.tsx";

/**
 * Form properties.
 */
export type FormProperties<TNumericIdentificationKeyValidator extends NumericIdentificationKeyValidator = NumericIdentificationKeyValidator, TNumericIdentificationKeyCreator extends TNumericIdentificationKeyValidator & NumericIdentificationKeyCreator = TNumericIdentificationKeyValidator & NumericIdentificationKeyCreator> = IdentificationKeyFormProperties<TNumericIdentificationKeyValidator, TNumericIdentificationKeyCreator>;
