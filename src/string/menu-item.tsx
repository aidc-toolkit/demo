import { AI39_CREATOR, AI64_VALIDATOR, AI82_CREATOR } from "@aidc-toolkit/gs1";
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
const STRING_FORMS_PROPERTIES: ReadonlyArray<StringFormProperties<boolean>> = [
    {
        characterSetResourceName: "String.numericCharacterSet",
        isValidatorOnly: false,
        validatorOrCreator: NUMERIC_CREATOR
    },
    {
        characterSetResourceName: "String.hexadecimalCharacterSet",
        isValidatorOnly: false,
        validatorOrCreator: HEXADECIMAL_CREATOR
    },
    {
        characterSetResourceName: "String.alphabeticCharacterSet",
        isValidatorOnly: false,
        validatorOrCreator: ALPHABETIC_CREATOR
    },
    {
        characterSetResourceName: "String.alphanumericCharacterSet",
        isValidatorOnly: false,
        validatorOrCreator: ALPHANUMERIC_CREATOR
    },
    {
        characterSetResourceName: "String.gs1AI82CharacterSet",
        isValidatorOnly: false,
        validatorOrCreator: AI82_CREATOR
    },
    {
        characterSetResourceName: "String.gs1AI39CharacterSet",
        isValidatorOnly: false,
        validatorOrCreator: AI39_CREATOR
    },
    {
        characterSetResourceName: "String.gs1AI64CharacterSet",
        isValidatorOnly: true,
        validatorOrCreator: AI64_VALIDATOR
    }
];

/**
 * Character set forms. Used to build second-level sub-menu.
 */
const FORM_DESCRIPTORS: ReadonlyArray<FormDescriptor<StringFormProperties<true>> | FormDescriptor<StringFormProperties<false>>> = [
    ValidateForm,
    CreateForm,
    CreateSequenceForm,
    ValueForm
];

export type { StringFormProperties };

/**
 * Top-level string menu item.
 */
export const STRING_MENU_ITEM: MenuItemProperties<StringFormProperties<boolean>> = {
    icon: <AbcIcon />,
    titleResourceName: "String.stringTitle",
    subMenuItems: STRING_FORMS_PROPERTIES.map(stringsProperty => ({
        titleResourceName: stringsProperty.characterSetResourceName,
        formGroupDescriptor: {
            formProperties: stringsProperty,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Necessary to allow validator type to coexist with creator type.
            FormDescriptors: (stringsProperty.isValidatorOnly ? [FORM_DESCRIPTORS[0]] : FORM_DESCRIPTORS) as ReadonlyArray<FormDescriptor<StringFormProperties<boolean>>>
        }
    }))
};
