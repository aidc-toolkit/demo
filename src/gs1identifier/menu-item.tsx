import {
    CPID_VALIDATOR,
    GCN_VALIDATOR,
    GDTI_VALIDATOR,
    GIAI_VALIDATOR,
    GINC_VALIDATOR,
    GLN_VALIDATOR,
    GMN_VALIDATOR,
    GRAI_VALIDATOR,
    GSIN_VALIDATOR,
    GSRN_VALIDATOR,
    GTIN_VALIDATORS, type IdentifierCreator,
    type IdentifierType,
    IdentifierTypes,
    type IdentifierValidation, type IdentifierValidator,
    type NonGTINNumericIdentifierType,
    type NumericIdentifierType, type SerializableNumericIdentifierType,
    SSCC_VALIDATOR
} from "@aidc-toolkit/gs1";
import { BarcodeReader as BarcodeReaderIcon } from "@mui/icons-material";
import type { FormDescriptor } from "../form-descriptor";
import type { MenuItemProperties } from "../menu-item";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm";
import type { FormProperties as GTINFormProperties } from "./GTIN";
import { GTIN12ZeroExpandForm } from "./GTIN12ZeroExpandForm";
import { GTIN12ZeroSuppressForm } from "./GTIN12ZeroSuppressForm";
import { GTIN14ConvertToForm } from "./GTIN14ConvertToForm";
import { GTIN14ValidateForm } from "./GTIN14ValidateForm";
import { GTINNormalizeForm } from "./GTINNormalizeForm";
import { GTINValidateAnyForm } from "./GTINValidateAnyForm";
import type { FormProperties as NonGTINNumericIdentifierFormProperties } from "./NonGTINNumericIdentifier";
import { NonNumericCreateForm } from "./NonNumericCreateForm";
import type { FormProperties as NonNumericIdentifierFormProperties } from "./NonNumericIdentifier";
import { NumericCreateAllForm } from "./NumericCreateAllForm";
import { NumericCreateForm } from "./NumericCreateForm";
import { NumericCreateSequenceForm } from "./NumericCreateSequenceForm";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier";
import { SerializableNumericConcatenateForm } from "./SerializableNumericConcatenateForm";
import { SerializableNumericCreateForm } from "./SerializableNumericCreateForm";
import type { FormProperties as SerializableNumericIdentifierFormProperties } from "./SerializableNumericIdentifier";
import { ValidateForm } from "./ValidateForm";

const IdentifierFormDescriptors: ReadonlyArray<FormDescriptor<IdentifierFormProperties<IdentifierType, IdentifierValidation, IdentifierValidator, IdentifierCreator<IdentifierType, IdentifierValidation>>>> = [
    ValidateForm
];

const NumericIdentifierFormDescriptors: ReadonlyArray<FormDescriptor<NumericIdentifierFormProperties<NumericIdentifierType>>> = [
    ...IdentifierFormDescriptors,
    NumericCreateForm,
    NumericCreateSequenceForm,
    NumericCreateAllForm
];

const GTINFormDescriptors: ReadonlyArray<FormDescriptor<GTINFormProperties> | null> = [
    ...NumericIdentifierFormDescriptors,
    null,
    GTIN12ZeroExpandForm,
    GTIN12ZeroSuppressForm,
    null,
    GTINValidateAnyForm,
    GTIN14ValidateForm,
    null,
    GTIN14ConvertToForm,
    GTINNormalizeForm
];

const NonGTINNumericIdentifierFormDescriptors: ReadonlyArray<FormDescriptor<NonGTINNumericIdentifierFormProperties<NonGTINNumericIdentifierType>>> = [
    ...NumericIdentifierFormDescriptors
];

const SerializableNumericIdentifierFormDescriptors: ReadonlyArray<FormDescriptor<SerializableNumericIdentifierFormProperties> | null> = [
    ...NonGTINNumericIdentifierFormDescriptors,
    null,
    SerializableNumericCreateForm,
    SerializableNumericConcatenateForm
];

const NonNumericIdentifierFormDescriptors: ReadonlyArray<FormDescriptor<NonNumericIdentifierFormProperties>> = [
    ...IdentifierFormDescriptors,
    NonNumericCreateForm
];

const GTIN_SUB_MENU_ITEMS: MenuItemProperties<GTINFormProperties> = {
    title: IdentifierTypes.GTIN,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GTIN,
            validatorsOrValidator: GTIN_VALIDATORS,
            getCreator: prefixManager => prefixManager.gtinCreator
        },
        FormDescriptors: GTINFormDescriptors
    }
};

const GLN_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentifierFormProperties<Exclude<NonGTINNumericIdentifierType, SerializableNumericIdentifierType>>> = {
    title: IdentifierTypes.GLN,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GLN,
            validatorsOrValidator: GLN_VALIDATOR,
            getCreator: prefixManager => prefixManager.glnCreator
        },
        FormDescriptors: NumericIdentifierFormDescriptors
    }
};

const SSCC_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentifierFormProperties<Exclude<NonGTINNumericIdentifierType, SerializableNumericIdentifierType>>> = {
    title: IdentifierTypes.SSCC,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.SSCC,
            validatorsOrValidator: SSCC_VALIDATOR,
            getCreator: prefixManager => prefixManager.ssccCreator
        },
        FormDescriptors: NumericIdentifierFormDescriptors
    }
};

const GRAI_SUB_MENU_ITEMS: MenuItemProperties<SerializableNumericIdentifierFormProperties> = {
    title: IdentifierTypes.GRAI,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GRAI,
            validatorsOrValidator: GRAI_VALIDATOR,
            getCreator: prefixManager => prefixManager.graiCreator
        },
        FormDescriptors: SerializableNumericIdentifierFormDescriptors
    }
};

const GIAI_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentifierFormProperties> = {
    title: IdentifierTypes.GIAI,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GIAI,
            validatorsOrValidator: GIAI_VALIDATOR,
            getCreator: prefixManager => prefixManager.giaiCreator
        },
        FormDescriptors: NonNumericIdentifierFormDescriptors
    }
};

const GSRN_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentifierFormProperties<Exclude<NonGTINNumericIdentifierType, SerializableNumericIdentifierType>>> = {
    title: IdentifierTypes.GSRN,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GSRN,
            validatorsOrValidator: GSRN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gsrnCreator
        },
        FormDescriptors: NumericIdentifierFormDescriptors
    }
};

const GDTI_SUB_MENU_ITEMS: MenuItemProperties<SerializableNumericIdentifierFormProperties> = {
    title: IdentifierTypes.GDTI,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GDTI,
            validatorsOrValidator: GDTI_VALIDATOR,
            getCreator: prefixManager => prefixManager.gdtiCreator
        },
        FormDescriptors: SerializableNumericIdentifierFormDescriptors
    }
};

const GINC_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentifierFormProperties> = {
    title: IdentifierTypes.GINC,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GINC,
            validatorsOrValidator: GINC_VALIDATOR,
            getCreator: prefixManager => prefixManager.gincCreator
        },
        FormDescriptors: NonNumericIdentifierFormDescriptors
    }
};

const GSIN_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentifierFormProperties<Exclude<NonGTINNumericIdentifierType, SerializableNumericIdentifierType>>> = {
    title: IdentifierTypes.GSIN,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GSIN,
            validatorsOrValidator: GSIN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gsinCreator
        },
        FormDescriptors: NumericIdentifierFormDescriptors
    }
};

const GCN_SUB_MENU_ITEMS: MenuItemProperties<SerializableNumericIdentifierFormProperties> = {
    title: IdentifierTypes.GCN,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GCN,
            validatorsOrValidator: GCN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gcnCreator
        },
        FormDescriptors: SerializableNumericIdentifierFormDescriptors
    }
};

const CPID_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentifierFormProperties> = {
    title: IdentifierTypes.CPID,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.CPID,
            validatorsOrValidator: CPID_VALIDATOR,
            getCreator: prefixManager => prefixManager.cpidCreator
        },
        FormDescriptors: NonNumericIdentifierFormDescriptors
    }
};

const GMN_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentifierFormProperties> = {
    title: IdentifierTypes.GMN,
    formGroupDescriptor: {
        formProperties: {
            identifierType: IdentifierTypes.GMN,
            validatorsOrValidator: GMN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gmnCreator
        },
        FormDescriptors: NonNumericIdentifierFormDescriptors
    }
};

/**
 * GS1 identifier form properties.
 */
export type GS1IdentifierFormProperties =
    GTINFormProperties | NonGTINNumericIdentifierFormProperties<Exclude<NonGTINNumericIdentifierType, SerializableNumericIdentifierType>> | SerializableNumericIdentifierFormProperties | NonNumericIdentifierFormProperties;

/**
 * Top-level GS1 identifier menu item.
 */
export const GS1_IDENTIFIER_MENU_ITEM: MenuItemProperties<GS1IdentifierFormProperties> = {
    icon: <BarcodeReaderIcon />,
    titleResourceName: "GS1.gs1Identifier",
    subMenuItems: [
        GTIN_SUB_MENU_ITEMS,
        GLN_SUB_MENU_ITEMS,
        SSCC_SUB_MENU_ITEMS,
        GRAI_SUB_MENU_ITEMS,
        GIAI_SUB_MENU_ITEMS,
        GSRN_SUB_MENU_ITEMS,
        GDTI_SUB_MENU_ITEMS,
        GINC_SUB_MENU_ITEMS,
        GSIN_SUB_MENU_ITEMS,
        GCN_SUB_MENU_ITEMS,
        CPID_SUB_MENU_ITEMS,
        GMN_SUB_MENU_ITEMS
    ]
};
