import { FormControl, FormControlLabel, FormHelperText, FormLabel, Input, Radio, RadioGroup, Typography } from "@mui/material";
import { type ReactElement, useContext, useEffect, useState } from "react";
import { BaseForm } from "./BaseForm.tsx";
import type { InputManager } from "./form-manager.ts";
import type { InputProperties } from "./input-properties.ts";

/**
 * Enumeration input properties.
 */
interface EnumInputProperties<T extends number> extends InputProperties<T> {
    /**
     * Enum values.
     */
    readonly values: readonly T[];

    /**
     * Enum names, aligned with values.
     */
    readonly names: string[];
}

/**
 * Enumeration input. Renders radio group controls if multiple or a hidden control if single.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function EnumInput<T extends number>(properties: EnumInputProperties<T>): ReactElement {
    const defaultValue = properties.values[0];

    const formManager = useContext(BaseForm.Context);
    const [inputManager, setInputManager] = useState<InputManager<T, true>>();
    const [checkedValue, setCheckedValue] = useState(defaultValue);

    useEffect(() => {
        /**
         * Handle value being reset.
         */
        function reset(): void {
            setCheckedValue(defaultValue);
        }

        const inputManager = formManager.addInputManager(properties.name, "number", true, defaultValue.toString(), properties.onProcess, reset);

        setInputManager(inputManager);

        let checkedValue = inputManager.value;

        // Value must be within range of acceptable values.
        if (!properties.values.includes(checkedValue)) {
            checkedValue = defaultValue;
            inputManager.value = defaultValue;
        }

        // Update checked value from input manager.
        setCheckedValue(checkedValue);

        return () => {
            formManager.removeInputManager(properties.name);
        };
    }, [formManager, properties.name, properties.values, properties.onProcess, defaultValue]);

    return properties.values.length !== 1 ?
        <FormControl>
            <FormLabel>{properties.label}</FormLabel>
            <RadioGroup
                row
                name={properties.name}
                onChange={(event) => {
                    if (inputManager !== undefined) {
                        inputManager.stringValue = event.target.value;
                        setCheckedValue(inputManager.value);
                    }
                }}
            >
                {properties.values.map(value =>
                    <FormControlLabel
                        key={`${properties.name}-${value}`}
                        value={value}
                        control={<Radio checked={value === checkedValue} />}
                        label={
                            <Typography
                                variant="body2"
                            >
                                {properties.names[value]}
                            </Typography>
                        }
                    />
                )}
            </RadioGroup>
            <FormHelperText>{properties.hint}</FormHelperText>
        </FormControl> :
        <Input name={properties.name} hidden value={checkedValue} />;
}
