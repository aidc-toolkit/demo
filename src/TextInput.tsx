import { TextField } from "@mui/material";
import { type ReactElement, useContext, useState } from "react";
import { BaseForm } from "./BaseForm";
import type { FormManager } from "./form-manager";
import type { InputProperties } from "./input-properties";
import type { Optional, Primitive } from "./type";

/**
 * Text input properties. Primitive type is declared via the type string.
 */
interface TextInputProperties<TFormData extends object, TTypeString extends "string" | "number", IsRequired extends boolean> extends InputProperties<TFormData, Primitive<TTypeString>> {
    /**
     * Input type.
     */
    readonly type: TTypeString;

    /**
     * True if required.
     */
    readonly isRequired: IsRequired;
}

/**
 * Text input. Renders an optional label and text control.
 *
 * @param properties
 * Properties
 *
 * @returns
 * React element.
 */
export function TextInput<TFormData extends object, TTypeString extends "string" | "number", IsRequired extends boolean>(properties: Optional<TextInputProperties<TFormData, TTypeString, IsRequired>, "label">): ReactElement {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Match type for enclosing form.
    const formManager = useContext(BaseForm.Context) as unknown as FormManager<TFormData>;
    const [inputState, setInputState] = useState(
        () => formManager.getInputState(properties.name, properties.type, properties.isRequired, undefined)
    );

    inputState.saveSetState(setInputState);

    return <TextField
        name={properties.name}
        label={properties.label}
        error={inputState.errorMessage !== undefined}
        helperText={inputState.errorMessage ?? properties.hint}
        required={properties.isRequired}
        value={inputState.stringValue}
        onChange={(event) => {
            formManager.saveInputValue(inputState, inputState.valueOf(event.target.value));
        }}
    />;
}
