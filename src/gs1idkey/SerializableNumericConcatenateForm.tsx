import { PrefixManager, PrefixType } from "@aidc-toolkit/gs1";
import type { ParseKeys } from "i18next";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import * as IdentificationKey from "./IdentificationKey.tsx";
import * as SerializableNumericIdentificationKey from "./SerializableNumericIdentificationKey.tsx";

/**
 * Concatenate a base identification key with a serial component form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function SerializableNumericConcatenateForm(properties: SerializableNumericIdentificationKey.FormProperties): ReactElement {
    let identificationKey: string;
    let serialComponent: string;

    /**
     * Process the form.
     *
     * @returns
     * Concatenated identification key.
     */
    function onProcess(): string {
        return properties.getCreator(PrefixManager.get(PrefixType.GS1CompanyPrefix, "9521234")).concatenate(identificationKey, serialComponent);
    }

    return <IdentificationKey.BaseForm
        {...properties}
        subtitleResourceName={SerializableNumericConcatenateForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={properties.identificationKeyType}
            label={i18nextDemo.t("GS1.baseIdentificationKeyLabel", {
                identificationKeyType: properties.identificationKeyType
            })}
            hint={i18nextDemo.t("GS1.baseIdentificationKeyHint", {
                identificationKeyType: properties.identificationKeyType
            })}
            onProcess={(inputValue) => {
                identificationKey = inputValue;
            }}
        />
        <SerializableNumericIdentificationKey.SerialComponentInput
            onProcess={(inputValue) => {
                serialComponent = inputValue;
            }}
        />
    </IdentificationKey.BaseForm>;
}

SerializableNumericConcatenateForm.resourceName = "GS1.concatenateSerializedSubtitle" as ParseKeys;
