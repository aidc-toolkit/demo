import { type GTINType, GTINValidator, IdentifierTypes } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import { type DemoParseKeys, i18nextDemoT } from "../locale/i18n.js";
import { BaseForm } from "./BaseForm.jsx";
import type { FormProperties } from "./GTIN.jsx";
import { type IdentifierData, IdentifierInput } from "./IdentifierInput.jsx";

/**
 * Form data.
 */
type FormData = IdentifierData<GTINType>;

/**
 * Validate GTIN-14 form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function GTIN14ValidateForm(properties: FormProperties): ReactElement {
    /**
     * Process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * Checkmark and identifier.
     */
    function onProcess(formData: FormData): string {
        GTINValidator.validateGTIN14(formData.identifier);

        return `✓ ${formData.identifier}`;
    }

    return <BaseForm
        {...properties}
        subtitleResourceName={GTIN14ValidateForm.resourceName}
        onProcess={onProcess}
    >
        <IdentifierInput
            identifierType={IdentifierTypes.GTIN}
            label={i18nextDemoT("GS1.gtin14Label")}
            hint={i18nextDemoT("GS1.gtin14ToBeValidatedHint")}
        />
    </BaseForm>;
}

GTIN14ValidateForm.resourceName = "GS1.validateGTIN14Subtitle" as DemoParseKeys;
