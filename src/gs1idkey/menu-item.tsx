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
    GTIN_VALIDATORS,
    IdentificationKeyType,
    SSCC_VALIDATOR
} from "@aidc-toolkit/gs1";
import { BarcodeReader as BarcodeReaderIcon } from "@mui/icons-material";
import type { FormDescriptor } from "../form-descriptor.ts";
import type { MenuItemProperties } from "../menu-item.ts";
import type { FormProperties as IdentificationKeyFormProperties } from "./BaseForm.tsx";
import type { FormProperties as GTINFormProperties } from "./GTIN.tsx";
import { GTIN12ZeroExpandForm } from "./GTIN12ZeroExpandForm.tsx";
import { GTIN12ZeroSuppressForm } from "./GTIN12ZeroSuppressForm.tsx";
import { GTIN14ConvertToForm } from "./GTIN14ConvertToForm.tsx";
import { GTIN14ValidateForm } from "./GTIN14ValidateForm.tsx";
import { GTINNormalizeForm } from "./GTINNormalizeForm.tsx";
import { GTINValidateAnyForm } from "./GTINValidateAnyForm.tsx";
import type {
    FormProperties as NonGTINNumericIdentificationKeyFormProperties
} from "./NonGTINNumericIdentificationKey.tsx";
import { NonNumericCreateForm } from "./NonNumericCreateForm.tsx";
import type { FormProperties as NonNumericIdentificationKeyFormProperties } from "./NonNumericIdentificationKey.tsx";
import { NumericCreateAllForm } from "./NumericCreateAllForm.tsx";
import { NumericCreateForm } from "./NumericCreateForm.tsx";
import { NumericCreateSequenceForm } from "./NumericCreateSequenceForm.tsx";
import type { FormProperties as NumericIdentificationKeyFormProperties } from "./NumericIdentificationKey.tsx";
import { SerializableNumericConcatenateForm } from "./SerializableNumericConcatenateForm.tsx";
import { SerializableNumericCreateForm } from "./SerializableNumericCreateForm.tsx";
import type {
    FormProperties as SerializableNumericIdentificationKeyFormProperties
} from "./SerializableNumericIdentificationKey.tsx";
import { ValidateForm } from "./ValidateForm.tsx";

const IdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<IdentificationKeyFormProperties>> = [
    ValidateForm
];

const NumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<NumericIdentificationKeyFormProperties>> = [
    ...IdentificationKeyFormDescriptors,
    NumericCreateForm,
    NumericCreateSequenceForm,
    NumericCreateAllForm
];

const GTINFormDescriptors: ReadonlyArray<FormDescriptor<GTINFormProperties> | null> = [
    ...NumericIdentificationKeyFormDescriptors,
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

const NonGTINNumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<NonGTINNumericIdentificationKeyFormProperties>> = [
    ...NumericIdentificationKeyFormDescriptors
];

const SerializableNumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<SerializableNumericIdentificationKeyFormProperties> | null> = [
    ...NonGTINNumericIdentificationKeyFormDescriptors,
    null,
    SerializableNumericCreateForm,
    SerializableNumericConcatenateForm
];

const NonNumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<NonNumericIdentificationKeyFormProperties>> = [
    ...IdentificationKeyFormDescriptors,
    NonNumericCreateForm
];

const GTIN_SUB_MENU_ITEMS: MenuItemProperties<GTINFormProperties> = {
    title: IdentificationKeyType.GTIN,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GTIN,
            validatorOrValidators: GTIN_VALIDATORS,
            getCreator: prefixManager => prefixManager.gtinCreator
        },
        FormDescriptors: GTINFormDescriptors
    }
};

const GLN_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GLN,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GLN,
            validatorOrValidators: GLN_VALIDATOR,
            getCreator: prefixManager => prefixManager.glnCreator
        },
        FormDescriptors: NumericIdentificationKeyFormDescriptors
    }
};

const SSCC_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.SSCC,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.SSCC,
            validatorOrValidators: SSCC_VALIDATOR,
            getCreator: prefixManager => prefixManager.ssccCreator
        },
        FormDescriptors: NumericIdentificationKeyFormDescriptors
    }
};

const GRAI_SUB_MENU_ITEMS: MenuItemProperties<SerializableNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GRAI,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GRAI,
            validatorOrValidators: GRAI_VALIDATOR,
            getCreator: prefixManager => prefixManager.graiCreator
        },
        FormDescriptors: SerializableNumericIdentificationKeyFormDescriptors
    }
};

const GIAI_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GIAI,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GIAI,
            validatorOrValidators: GIAI_VALIDATOR,
            getCreator: prefixManager => prefixManager.giaiCreator
        },
        FormDescriptors: NonNumericIdentificationKeyFormDescriptors
    }
};

const GSRN_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GSRN,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GSRN,
            validatorOrValidators: GSRN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gsrnCreator
        },
        FormDescriptors: NumericIdentificationKeyFormDescriptors
    }
};

const GDTI_SUB_MENU_ITEMS: MenuItemProperties<SerializableNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GDTI,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GDTI,
            validatorOrValidators: GDTI_VALIDATOR,
            getCreator: prefixManager => prefixManager.gdtiCreator
        },
        FormDescriptors: SerializableNumericIdentificationKeyFormDescriptors
    }
};

const GINC_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GINC,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GINC,
            validatorOrValidators: GINC_VALIDATOR,
            getCreator: prefixManager => prefixManager.gincCreator
        },
        FormDescriptors: NonNumericIdentificationKeyFormDescriptors
    }
};

const GSIN_SUB_MENU_ITEMS: MenuItemProperties<NonGTINNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GSIN,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GSIN,
            validatorOrValidators: GSIN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gsinCreator
        },
        FormDescriptors: NumericIdentificationKeyFormDescriptors
    }
};

const GCN_SUB_MENU_ITEMS: MenuItemProperties<SerializableNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GCN,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GCN,
            validatorOrValidators: GCN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gcnCreator
        },
        FormDescriptors: SerializableNumericIdentificationKeyFormDescriptors
    }
};

const CPID_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.CPID,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.CPID,
            validatorOrValidators: CPID_VALIDATOR,
            getCreator: prefixManager => prefixManager.cpidCreator
        },
        FormDescriptors: NonNumericIdentificationKeyFormDescriptors
    }
};

const GMN_SUB_MENU_ITEMS: MenuItemProperties<NonNumericIdentificationKeyFormProperties> = {
    title: IdentificationKeyType.GMN,
    formGroupDescriptor: {
        formProperties: {
            identificationKeyType: IdentificationKeyType.GMN,
            validatorOrValidators: GMN_VALIDATOR,
            getCreator: prefixManager => prefixManager.gmnCreator
        },
        FormDescriptors: NonNumericIdentificationKeyFormDescriptors
    }
};

/**
 * GS1 identification key form properties.
 */
export type GS1IDKeyFormProperties =
    GTINFormProperties | NonGTINNumericIdentificationKeyFormProperties | SerializableNumericIdentificationKeyFormProperties | NonNumericIdentificationKeyFormProperties;

/**
 * Top-level GS1 ID key menu item.
 */
export const GS1_ID_KEY_MENU_ITEM: MenuItemProperties<GS1IDKeyFormProperties> = {
    icon: <BarcodeReaderIcon />,
    titleResourceName: "GS1.gs1IDKeyTitle",
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
