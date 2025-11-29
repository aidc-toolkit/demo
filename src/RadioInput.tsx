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
import { BaseForm } from "./BaseForm";
import type { FormManager } from "./form-manager";
import type { InputProperties } from "./input-properties";
import type { Primitive, TypeString } from "./type";

/**
 * Radio input properties.
 */
interface RadioInputProperties<TFormData extends object, TTypeString extends "string" | "number", TPrimitive extends Exclude<Primitive<TTypeString>, boolean>> extends InputProperties<TFormData, TPrimitive> {
    /**
     * Type.
     */
    readonly type: TypeString;

    /**
     * Values.
     */
    readonly values: readonly TPrimitive[];

    /**
     * Names, aligned with values.
     */
    readonly names: Record<TPrimitive, string>;
}

/**
 * Radio input. Renders radio group controls if multiple or a hidden control if single.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function RadioInput<TFormData extends object, TTypeString extends "string" | "number", TPrimitive extends Exclude<Primitive<TTypeString>, boolean>>(properties: RadioInputProperties<TFormData, TTypeString, TPrimitive>): ReactElement {
    const defaultValue = properties.values[0];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Match type for enclosing form.
    const formManager = useContext(BaseForm.Context) as unknown as FormManager<TFormData>;
    const [inputState, setInputState] = useState(
        () => formManager.getInputState(properties.name, properties.type, true, defaultValue)
    );

    inputState.saveSetState(setInputState);

    const value = inputState.value;

    // Value must be within range of acceptable values.
    if (!properties.values.includes(value)) {
        formManager.saveInputValue(inputState, defaultValue);
    }

    return properties.values.length !== 1 ?
        <FormControl>
            <FormLabel>{properties.label}</FormLabel>
            <RadioGroup
                row
                name={properties.name}
                onChange={(event) => {
                    formManager.saveInputValue(inputState, inputState.valueOf(event.target.value));
                }}
            >
                {properties.values.map(radioValue =>
                    <FormControlLabel
                        key={`${properties.name}-${radioValue}`}
                        value={String(radioValue)}
                        control={<Radio checked={radioValue === value} />}
                        label={
                            <Typography
                                variant="body2"
                            >
                                {properties.names[radioValue]}
                            </Typography>
                        }
                    />
                )}
            </RadioGroup>
            <FormHelperText>{properties.hint}</FormHelperText>
        </FormControl> :
        <Input name={properties.name} hidden value={String(value)} />;
}
