import { TextField } from "@mui/material";
import { type ReactElement, useContext, useEffect, useState } from "react";
import { BaseForm } from "./BaseForm.tsx";
import type { InputManager, InputValue } from "./form-manager.ts";
import type { InputProperties } from "./input-properties.ts";
import type { Optional, Primitive } from "./type.ts";

/**
 * Text input properties. Primitive type is declared via the type string.
 */
interface TextInputProperties<T extends "string" | "number", IsRequired extends boolean> extends InputProperties<InputValue<Primitive<T>, IsRequired>> {
    /**
     * Input type.
     */
    readonly type: T;

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
export function TextInput<T extends "string" | "number", IsRequired extends boolean>(properties: Optional<TextInputProperties<T, IsRequired>, "label">): ReactElement {
    const formManager = useContext(BaseForm.Context);
    const [inputManager, setInputManager] = useState<InputManager<Primitive<T>, IsRequired>>();
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        /**
         * Handle value being reset.
         */
        function reset(): void {
            setValue("");
        }

        const inputManager = formManager.addInputManager(properties.name, properties.type, properties.isRequired, "", properties.onProcess, reset, setError);

        setInputManager(inputManager);

        // Update value from input manager.
        setValue(inputManager.stringValue);

        return () => {
            formManager.removeInputManager(properties.name);
        };
    }, [formManager, properties.name, properties.type, properties.isRequired, properties.onProcess]);

    return <TextField
        name={properties.name}
        label={properties.label}
        error={error !== undefined}
        helperText={error ?? properties.hint}
        required={properties.isRequired}
        value={value}
        onChange={(event) => {
            if (inputManager !== undefined) {
                inputManager.stringValue = event.target.value;
                setValue(event.target.value);
            }
        }}
    />;
}
