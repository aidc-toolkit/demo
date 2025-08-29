import type {
    SerializableNumericIdentificationKeyCreator,
    SerializableNumericIdentificationKeyValidator
} from "@aidc-toolkit/gs1";
import type {
    FormProperties as NonGTINNumericIdentificationKeyFormProperties
} from "./NonGTINNumericIdentificationKey.tsx";

/**
 * Form properties.
 */
export type FormProperties = NonGTINNumericIdentificationKeyFormProperties<SerializableNumericIdentificationKeyValidator, SerializableNumericIdentificationKeyCreator>;
