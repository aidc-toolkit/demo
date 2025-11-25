import type { NonNumericIdentifierCreator, NonNumericIdentifierValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm.tsx";

/**
 * Form properties.
 */
export type FormProperties = IdentifierFormProperties<NonNumericIdentifierValidator, NonNumericIdentifierCreator>;
