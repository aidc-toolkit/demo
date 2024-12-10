import { PrefixManager, PrefixType } from "@aidc-toolkit/gs1";
import type { ReactElement } from "react";
import i18next, { demoNS } from "../locale/i18n.ts";
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
export function ConcatenateSerializableNumericForm(properties: SerializableNumericIdentificationKey.FormProperties): ReactElement {
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
        subtitleResourceName={ConcatenateSerializableNumericForm.resourceName}
        onProcess={onProcess}
        resultName="identificationKey"
    >
        <IdentificationKey.IdentificationKeyInput
            identificationKeyType={properties.identificationKeyType}
            label={i18next.t("GS1.baseIdentificationKeyLabel", {
                ns: demoNS,
                identificationKeyType: properties.identificationKeyType
            })}
            hint={i18next.t("GS1.baseIdentificationKeyHint", {
                ns: demoNS,
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

ConcatenateSerializableNumericForm.resourceName = "GS1.concatenateSubtitle";
