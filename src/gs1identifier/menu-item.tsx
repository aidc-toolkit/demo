import {
    type IdentifierType,
    IdentifierTypes,
    IdentifierValidators,
    type NonGTINNumericIdentifierType,
    type NumericIdentifierType,
    type SerializableNumericIdentifierType
} from "@aidc-toolkit/gs1";
import { BarcodeReader as BarcodeReaderIcon } from "@mui/icons-material";
import type { FormDescriptor } from "../form-descriptor.js";
import type { MenuItemProperties } from "../menu-item.js";
import type { FormProperties as IdentifierFormProperties } from "./BaseForm.jsx";
import type { FormProperties as GTINFormProperties } from "./GTIN.jsx";
import { GTIN12ZeroExpandForm } from "./GTIN12ZeroExpandForm.jsx";
import { GTIN12ZeroSuppressForm } from "./GTIN12ZeroSuppressForm.jsx";
import { GTIN14ConvertToForm } from "./GTIN14ConvertToForm.jsx";
import { GTIN14ValidateForm } from "./GTIN14ValidateForm.jsx";
import { GTINNormalizeForm } from "./GTINNormalizeForm.jsx";
import { GTINValidateAnyForm } from "./GTINValidateAnyForm.jsx";
import type { FormProperties as NonGTINNumericIdentifierFormProperties } from "./NonGTINNumericIdentifier.jsx";
import { NonNumericCreateForm } from "./NonNumericCreateForm.jsx";
import type { FormProperties as NonNumericIdentifierFormProperties } from "./NonNumericIdentifier.jsx";
import { NumericCreateAllForm } from "./NumericCreateAllForm.jsx";
import { NumericCreateForm } from "./NumericCreateForm.jsx";
import { NumericCreateSequenceForm } from "./NumericCreateSequenceForm.jsx";
import type { FormProperties as NumericIdentifierFormProperties } from "./NumericIdentifier.jsx";
import { SerializableNumericConcatenateForm } from "./SerializableNumericConcatenateForm.jsx";
import { SerializableNumericCreateForm } from "./SerializableNumericCreateForm.jsx";
import type { FormProperties as SerializableNumericIdentifierFormProperties } from "./SerializableNumericIdentifier.jsx";
import { ValidateForm } from "./ValidateForm.jsx";

const IdentifierFormDescriptors: ReadonlyArray<FormDescriptor<IdentifierFormProperties<IdentifierType>>> = [
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
            validatorsOrValidator: IdentifierValidators.GTIN,
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
            validatorsOrValidator: IdentifierValidators.GLN,
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
            validatorsOrValidator: IdentifierValidators.SSCC,
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
            validatorsOrValidator: IdentifierValidators.GRAI,
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
            validatorsOrValidator: IdentifierValidators.GIAI,
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
            validatorsOrValidator: IdentifierValidators.GSRN,
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
            validatorsOrValidator: IdentifierValidators.GDTI,
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
            validatorsOrValidator: IdentifierValidators.GINC,
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
            validatorsOrValidator: IdentifierValidators.GSIN,
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
            validatorsOrValidator: IdentifierValidators.GCN,
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
            validatorsOrValidator: IdentifierValidators.CPID,
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
            validatorsOrValidator: IdentifierValidators.GMN,
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
