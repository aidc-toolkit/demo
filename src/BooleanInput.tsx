import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import { type ReactElement, useContext, useEffect, useState } from "react";
import { BaseForm } from "./BaseForm.tsx";
import type { InputManager } from "./form-manager.ts";
import type { InputProperties } from "./input-properties.ts";

/**
 * Boolean input. Renders a checkbox input.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BooleanInput(properties: InputProperties<boolean>): ReactElement {
    const formManager = useContext(BaseForm.Context);
    const [inputManager, setInputManager] = useState<InputManager<boolean, true>>();
    const [value, setValue] = useState(false);

    useEffect(() => {
        /**
         * Handle value being reset.
         */
        function reset(): void {
            setValue(false);
        }

        const inputManager = formManager.addInputManager(properties.name, "boolean", true, String(false), properties.onProcess, reset);

        setInputManager(inputManager);

        // Update value from input manager.
        setValue(inputManager.value);

        return () => {
            formManager.removeInputManager(properties.name);
        };
    }, [formManager, properties.name, properties.onProcess]);

    return <FormControl>
        <FormControlLabel
            name={properties.name}
            control={<Checkbox
                checked={value}
                onChange={(event) => {
                    if (inputManager !== undefined) {
                        inputManager.value = event.target.checked;
                        setValue(event.target.checked);
                    }
                }}
            />}
            label={properties.label}
        />
        <FormHelperText>{properties.hint}</FormHelperText>
    </FormControl>;
}
