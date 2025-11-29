import type { SerializableNumericIdentifierCreator, SerializableNumericIdentifierValidator } from "@aidc-toolkit/gs1";
import type { FormProperties as NonGTINNumericIdentifierFormProperties } from "./NonGTINNumericIdentifier";

/**
 * Form properties.
 */
export type FormProperties = NonGTINNumericIdentifierFormProperties<SerializableNumericIdentifierValidator, SerializableNumericIdentifierCreator>;
