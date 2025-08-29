import type { NonNumericIdentificationKeyCreator, NonNumericIdentificationKeyValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as IdentificationKeyFormProperties } from "./BaseForm.tsx";

/**
 * Form properties.
 */
export type FormProperties = IdentificationKeyFormProperties<NonNumericIdentificationKeyValidator, NonNumericIdentificationKeyCreator>;
