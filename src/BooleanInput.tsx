import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import { type ReactElement, useContext, useState } from "react";
import { BaseForm } from "./BaseForm.jsx";
import type { FormManager } from "./form-manager.js";
import type { InputProperties } from "./input-properties.js";

/**
 * Boolean input. Renders a checkbox input.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BooleanInput<TFormData extends object>(properties: InputProperties<TFormData, boolean>): ReactElement {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Match type for enclosing form.
    const formManager = useContext(BaseForm.Context) as unknown as FormManager<TFormData>;
    const [inputState, setInputState] = useState(
        () => formManager.getInputState(properties.name, "boolean", true, false)
    );

    inputState.saveSetState(setInputState);

    return <FormControl>
        <FormControlLabel
            name={properties.name}
            control={<Checkbox
                checked={inputState.value}
                onChange={(event) => {
                    formManager.saveInputValue(inputState, event.target.checked);
                }}
            />}
            label={properties.label}
        />
        <FormHelperText>{properties.hint}</FormHelperText>
    </FormControl>;
}
