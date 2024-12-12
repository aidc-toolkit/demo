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
import type { ReactElement } from "react";
import { i18nextDemo } from "../locale/i18n.ts";
import { type FormDescriptor, Menu as DemoMenu, type SubMenuProperties } from "../Menu.tsx";
import type * as GTIN from "./GTIN.tsx";
import { GTIN12ZeroExpandForm } from "./GTIN12ZeroExpandForm.tsx";
import { GTIN12ZeroSuppressForm } from "./GTIN12ZeroSuppressForm.tsx";
import { GTIN14ConvertToForm } from "./GTIN14ConvertToForm.tsx";
import { GTIN14ValidateForm } from "./GTIN14ValidateForm.tsx";
import { GTINNormalizeForm } from "./GTINNormalizeForm.tsx";
import { GTINValidateAnyForm } from "./GTINValidateAnyForm.tsx";
import type * as IdentificationKey from "./IdentificationKey.tsx";
import type * as NonGTINNumericIdentificationKey from "./NonGTINNumericIdentificationKey.tsx";
import { NonNumericCreateForm } from "./NonNumericCreateForm.tsx";
import type * as NonNumericIdentificationKey from "./NonNumericIdentificationKey.tsx";
import { NumericCreateAllForm } from "./NumericCreateAllForm.tsx";
import { NumericCreateForm } from "./NumericCreateForm.tsx";
import { NumericCreateSequenceForm } from "./NumericCreateSequenceForm.tsx";
import type * as NumericIdentificationKey from "./NumericIdentificationKey.tsx";
import { SerializableNumericConcatenateForm } from "./SerializableNumericConcatenateForm.tsx";
import { SerializableNumericCreateForm } from "./SerializableNumericCreateForm.tsx";
import type * as SerializableNumericIdentificationKey from "./SerializableNumericIdentificationKey.tsx";
import { ValidateForm } from "./ValidateForm.tsx";

const IdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<IdentificationKey.FormProperties>> = [
    ValidateForm
];

const NumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<NumericIdentificationKey.FormProperties>> = [
    ...IdentificationKeyFormDescriptors,
    NumericCreateForm,
    NumericCreateSequenceForm,
    NumericCreateAllForm
];

const GTINFormDescriptors: ReadonlyArray<FormDescriptor<GTIN.FormProperties> | null> = [
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

const NonGTINNumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<NonGTINNumericIdentificationKey.FormProperties>> = [
    ...NumericIdentificationKeyFormDescriptors
];

const SerializableNumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<SerializableNumericIdentificationKey.FormProperties> | null> = [
    ...NonGTINNumericIdentificationKeyFormDescriptors,
    null,
    SerializableNumericCreateForm,
    SerializableNumericConcatenateForm
];

const NonNumericIdentificationKeyFormDescriptors: ReadonlyArray<FormDescriptor<NonNumericIdentificationKey.FormProperties>> = [
    ...IdentificationKeyFormDescriptors,
    NonNumericCreateForm
];

const GTIN_SUB_MENU: SubMenuProperties<GTIN.FormProperties> = {
    title: IdentificationKeyType.GTIN,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GTIN,
        validatorOrValidators: GTIN_VALIDATORS,
        getCreator: prefixManager => prefixManager.gtinCreator
    },
    FormDescriptors: GTINFormDescriptors
};

const GLN_SUB_MENU: SubMenuProperties<NonGTINNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GLN,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GLN,
        validatorOrValidators: GLN_VALIDATOR,
        getCreator: prefixManager => prefixManager.glnCreator
    },
    FormDescriptors: NumericIdentificationKeyFormDescriptors
};

const SSCC_SUB_MENU: SubMenuProperties<NonGTINNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.SSCC,
    formProperties: {
        identificationKeyType: IdentificationKeyType.SSCC,
        validatorOrValidators: SSCC_VALIDATOR,
        getCreator: prefixManager => prefixManager.ssccCreator
    },
    FormDescriptors: NumericIdentificationKeyFormDescriptors
};

const GRAI_SUB_MENU: SubMenuProperties<SerializableNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GRAI,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GRAI,
        validatorOrValidators: GRAI_VALIDATOR,
        getCreator: prefixManager => prefixManager.graiCreator
    },
    FormDescriptors: SerializableNumericIdentificationKeyFormDescriptors
};

const GIAI_SUB_MENU: SubMenuProperties<NonNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GIAI,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GIAI,
        validatorOrValidators: GIAI_VALIDATOR,
        getCreator: prefixManager => prefixManager.giaiCreator
    },
    FormDescriptors: NonNumericIdentificationKeyFormDescriptors
};

const GSRN_SUB_MENU: SubMenuProperties<NonGTINNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GSRN,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GSRN,
        validatorOrValidators: GSRN_VALIDATOR,
        getCreator: prefixManager => prefixManager.gsrnCreator
    },
    FormDescriptors: NumericIdentificationKeyFormDescriptors
};

const GDTI_SUB_MENU: SubMenuProperties<SerializableNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GDTI,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GDTI,
        validatorOrValidators: GDTI_VALIDATOR,
        getCreator: prefixManager => prefixManager.gdtiCreator
    },
    FormDescriptors: SerializableNumericIdentificationKeyFormDescriptors
};

const GINC_SUB_MENU: SubMenuProperties<NonNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GINC,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GINC,
        validatorOrValidators: GINC_VALIDATOR,
        getCreator: prefixManager => prefixManager.gincCreator
    },
    FormDescriptors: NonNumericIdentificationKeyFormDescriptors
};

const GSIN_SUB_MENU: SubMenuProperties<NonGTINNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GSIN,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GSIN,
        validatorOrValidators: GSIN_VALIDATOR,
        getCreator: prefixManager => prefixManager.gsinCreator
    },
    FormDescriptors: NumericIdentificationKeyFormDescriptors
};

const GCN_SUB_MENU: SubMenuProperties<SerializableNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GCN,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GCN,
        validatorOrValidators: GCN_VALIDATOR,
        getCreator: prefixManager => prefixManager.gcnCreator
    },
    FormDescriptors: SerializableNumericIdentificationKeyFormDescriptors
};

const CPID_SUB_MENU: SubMenuProperties<NonNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.CPID,
    formProperties: {
        identificationKeyType: IdentificationKeyType.CPID,
        validatorOrValidators: CPID_VALIDATOR,
        getCreator: prefixManager => prefixManager.cpidCreator
    },
    FormDescriptors: NonNumericIdentificationKeyFormDescriptors
};

const GMN_SUB_MENU: SubMenuProperties<NonNumericIdentificationKey.FormProperties> = {
    title: IdentificationKeyType.GMN,
    formProperties: {
        identificationKeyType: IdentificationKeyType.GMN,
        validatorOrValidators: GMN_VALIDATOR,
        getCreator: prefixManager => prefixManager.gmnCreator
    },
    FormDescriptors: NonNumericIdentificationKeyFormDescriptors
};

/**
 * GS1 ID Key menu.
 *
 * @returns
 * React element.
 */
export function Menu(): ReactElement {
    return <DemoMenu<GTIN.FormProperties | NonGTINNumericIdentificationKey.FormProperties | SerializableNumericIdentificationKey.FormProperties | NonNumericIdentificationKey.FormProperties>
        title={i18nextDemo.t("GS1.gs1IDKeyTitle")}
        subMenus={[
            GTIN_SUB_MENU,
            GLN_SUB_MENU,
            SSCC_SUB_MENU,
            GRAI_SUB_MENU,
            GIAI_SUB_MENU,
            GSRN_SUB_MENU,
            GDTI_SUB_MENU,
            GINC_SUB_MENU,
            GSIN_SUB_MENU,
            GCN_SUB_MENU,
            CPID_SUB_MENU,
            GMN_SUB_MENU
        ]}
    />;
}
