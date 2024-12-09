import type { NonNumericIdentificationKeyCreator, NonNumericIdentificationKeyValidator } from "@aidc-toolkit/gs1";
import type * as IdentificationKey from "./IdentificationKey.tsx";

/**
 * Form properties.
 */
export type FormProperties = IdentificationKey.FormProperties<NonNumericIdentificationKeyValidator, NonNumericIdentificationKeyCreator>;
