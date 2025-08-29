import { FormGroup } from "@mui/material";
import type { ReactElement } from "react";
import type { InputProperties } from "../input-properties.ts";
import { i18nextDemo } from "../locale/i18n.ts";
import { TextInput } from "../TextInput.tsx";

/**
 * Start value and count input properties.
 */
interface StartValueAndCountInputProperties {
    /**
     * Start value properties.
     */
    startValue: Pick<InputProperties<number>, "hint" | "onProcess">;

    /**
     * Count properties.
     */
    count: Pick<InputProperties<number>, "hint" | "onProcess">;
}

/**
 * Start value and count input. Renders a required number text control with name "startValue" and a required number text
 * control with name "count".
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function StartValueAndCountInput(properties: StartValueAndCountInputProperties): ReactElement {
    return <FormGroup
        row
        sx={{
            flexWrap: "nowrap",
            gap: 1
        }}
    >
        <TextInput
            {...properties.startValue}
            name="startValue"
            label={i18nextDemo.t("String.startValueLabel")}
            type="number"
            isRequired
        />
        <TextInput
            {...properties.count}
            name="count"
            label={i18nextDemo.t("String.countLabel")}
            type="number"
            isRequired
        />
    </FormGroup>;
}
