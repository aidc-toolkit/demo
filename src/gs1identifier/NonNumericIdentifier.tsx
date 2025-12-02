import type {
    NonNumericIdentifierCreator,
    NonNumericIdentifierType,
    NonNumericIdentifierValidation,
    NonNumericIdentifierValidator
} from "@aidc-toolkit/gs1";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm";

/**
 * Form properties.
 */
export type FormProperties = IdentifierFormProperties<NonNumericIdentifierType, NonNumericIdentifierValidation, NonNumericIdentifierValidator, NonNumericIdentifierCreator>;
