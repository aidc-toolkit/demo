import { AI39_CREATOR, AI82_CREATOR } from "@aidc-toolkit/gs1";
import { ALPHABETIC_CREATOR, ALPHANUMERIC_CREATOR, HEXADECIMAL_CREATOR, NUMERIC_CREATOR } from "@aidc-toolkit/utility";
import { Abc as AbcIcon } from "@mui/icons-material";
import type { FormDescriptor } from "../form-descriptor";
import type { MenuItemProperties } from "../menu-item";
import type { FormProperties as StringFormProperties } from "./BaseForm";
import { CreateForm } from "./CreateForm";
import { CreateSequenceForm } from "./CreateSequenceForm";
import { ValidateForm } from "./ValidateForm";
import { ValueForm } from "./ValueForm";

/**
 * String forms properties. Used to build first-level sub-menu.
 */
const STRING_FORMS_PROPERTIES: readonly StringFormProperties[] = [
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
const FORM_DESCRIPTORS: ReadonlyArray<FormDescriptor<StringFormProperties>> = [
    ValidateForm,
    CreateForm,
    CreateSequenceForm,
    ValueForm
];

export type { StringFormProperties };

/**
 * Top-level string menu item.
 */
export const STRING_MENU_ITEM: MenuItemProperties<StringFormProperties> = {
    icon: <AbcIcon />,
    titleResourceName: "String.stringTitle",
    subMenuItems: STRING_FORMS_PROPERTIES.map(stringsProperty => ({
        titleResourceName: stringsProperty.characterSetResourceName,
        formGroupDescriptor: {
            formProperties: stringsProperty,
            FormDescriptors: FORM_DESCRIPTORS
        }
    }))
};
