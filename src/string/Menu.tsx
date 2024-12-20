import { AI39_CREATOR, AI82_CREATOR } from "@aidc-toolkit/gs1";
import { ALPHABETIC_CREATOR, ALPHANUMERIC_CREATOR, HEXADECIMAL_CREATOR, NUMERIC_CREATOR } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { type FormDescriptor, Menu as DemoMenu, type SubMenuProperties } from "../Menu.tsx";
import { CreateForm } from "./CreateForm.tsx";
import { CreateSequenceForm } from "./CreateSequenceForm.tsx";
import type * as String from "./String.tsx";
import { ValidateForm } from "./ValidateForm.tsx";
import { ValueForm } from "./ValueForm.tsx";

/**
 * String forms properties. Used to build first-level sub-menu.
 */
const STRING_FORMS_PROPERTIES: readonly String.FormProperties[] = [
    {
        characterSetResourceName: "String.numericCharacterSet",
        creator: NUMERIC_CREATOR
    },
    {
        characterSetResourceName: "String.hexadecimalCharacterSet",
        creator: HEXADECIMAL_CREATOR
    },
    {
        characterSetResourceName: "String.alphabeticCharacterSet",
        creator: ALPHABETIC_CREATOR
    },
    {
        characterSetResourceName: "String.alphanumericCharacterSet",
        creator: ALPHANUMERIC_CREATOR
    },
    {
        characterSetResourceName: "String.gs1AI82CharacterSet",
        creator: AI82_CREATOR
    },
    {
        characterSetResourceName: "String.gs1AI39CharacterSet",
        creator: AI39_CREATOR
    }
];

/**
 * Character set forms. Used to build second-level sub-menu.
 */
const FORM_DESCRIPTORS: ReadonlyArray<FormDescriptor<String.FormProperties>> = [
    ValidateForm,
    CreateForm,
    CreateSequenceForm,
    ValueForm
];

/**
 * String menu.
 *
 * @returns
 * React element.
 */
export function Menu(): ReactElement {
    return <DemoMenu
        title={i18nextDemo.t("String.stringTitle")}
        subMenus={STRING_FORMS_PROPERTIES.map(stringsProperty => ({
            title: i18nextDemo.t(stringsProperty.characterSetResourceName),
            formProperties: stringsProperty,
            FormDescriptors: FORM_DESCRIPTORS
        }) satisfies SubMenuProperties<String.FormProperties>)}
    />;
}
