import type { SerializableNumericIdentifierType } from "@aidc-toolkit/gs1";
import type { FormProperties as NonGTINNumericIdentifierFormProperties } from "./NonGTINNumericIdentifier.jsx";

/**
 * Form properties.
 */
export type FormProperties = NonGTINNumericIdentifierFormProperties<SerializableNumericIdentifierType>;
