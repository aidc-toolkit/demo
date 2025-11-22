import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import { type ReactElement, useContext, useState } from "react";
import { BaseForm } from "./BaseForm.tsx";
import type { FormManager } from "./form-manager.ts";
import type { InputProperties } from "./input-properties.ts";

/**
 * Enumeration input properties.
 */
interface EnumInputProperties<TFormData extends object, TInput extends number> extends InputProperties<TFormData, TInput> {
    /**
     * Enum values.
     */
    readonly enumValues: readonly TInput[];

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
export function EnumInput<TFormData extends object, TInput extends number>(properties: EnumInputProperties<TFormData, TInput>): ReactElement {
    const defaultValue = properties.enumValues[0];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Match type for enclosing form.
    const formManager = useContext(BaseForm.Context) as unknown as FormManager<TFormData>;
    const [inputState, setInputState] = useState(
        () => formManager.getInputState(properties.name, "number", true, defaultValue)
    );

    inputState.saveSetState(setInputState);

    const value = inputState.value;

    // Value must be within range of acceptable values.
    if (!properties.enumValues.includes(value)) {
        formManager.saveInputValue(inputState, defaultValue);
    }

    return properties.enumValues.length !== 1 ?
        <FormControl>
            <FormLabel>{properties.label}</FormLabel>
            <RadioGroup
                row
                name={properties.name}
                onChange={(event) => {
                    formManager.saveInputValue(inputState, inputState.valueOf(event.target.value));
                }}
            >
                {properties.enumValues.map(enumValue =>
                    <FormControlLabel
                        key={`${properties.name}-${enumValue}`}
                        value={enumValue}
                        control={<Radio checked={enumValue === value} />}
                        label={
                            <Typography
                                variant="body2"
                            >
                                {properties.names[enumValue]}
                            </Typography>
                        }
                    />
                )}
            </RadioGroup>
            <FormHelperText>{properties.hint}</FormHelperText>
        </FormControl> :
        <Input name={properties.name} hidden value={value} />;
}
