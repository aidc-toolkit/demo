import {
    CharacterSet,
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
    GTINCreator,
    GTINLevel,
    GTINValidator,
    type IdentificationKeyCreator,
    IdentificationKeyType,
    type IdentificationKeyValidation,
    type IdentificationKeyValidator,
    type NonGTINNumericIdentificationKeyCreator,
    type NonGTINNumericIdentificationKeyValidator,
    type NonNumericIdentificationKeyCreator,
    type NonNumericIdentificationKeyValidation,
    type NonNumericIdentificationKeyValidator,
    type NumericIdentificationKeyCreator,
    type NumericIdentificationKeyValidator,
    PrefixManager,
    PrefixType,
    type SerializableNumericIdentificationKeyCreator,
    type SerializableNumericIdentificationKeyValidator,
    SSCC_VALIDATOR
} from "@aidc-toolkit/gs1";
import { Exclusion, Sequencer } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import { NavDropdown } from "react-bootstrap";

import { AppComponent } from "./app_context.ts";
import { DemoForm } from "./Demo.tsx";

/**
 * Identification key properties.
 */
interface IdentificationKeyProperties<V extends IdentificationKeyValidator, C extends V & IdentificationKeyCreator> {
    /**
     * Identification key type.
     */
    identificationKeyType: IdentificationKeyType;

    /**
     * Validator (non-GTIN) or validators (GTIN).
     */
    validatorOrValidators: V | V[];

    /**
     * Creator callback.
     *
     * @param prefixManager
     * Prefix manager.
     *
     * @returns
     * Identification key creator.
     */
    creatorCallback: (prefixManager: PrefixManager) => C;
}

/**
 * Identification key form.
 *
 * @param V
 * Identification key validator class.
 *
 * @param C
 * Identification key creator class.
 */
abstract class IdentificationKeyForm<V extends IdentificationKeyValidator = IdentificationKeyValidator, C extends V & IdentificationKeyCreator = V & IdentificationKeyCreator> extends DemoForm<IdentificationKeyProperties<V, C>> {
    /**
     * @inheritDoc
     */
    protected get title(): string {
        return this.props.identificationKeyType;
    }

    /**
     * Get the validator, optionally by prefix type.
     *
     * @param prefixType
     * Prefix type.
     *
     * @returns
     * Identification key validator.
     */
    protected getValidator(prefixType: PrefixType): V {
        const validatorOrValidators = this.props.validatorOrValidators;

        return !Array.isArray(validatorOrValidators) ? validatorOrValidators : validatorOrValidators[prefixType];
    }

    /**
     * Get the creator.
     *
     * @param prefixType
     * Prefix type.
     *
     * @param prefix
     * Prefix.
     *
     * @returns
     * Identification key creator.
     */
    protected getCreator(prefixType: PrefixType, prefix: string): C {
        return this.props.creatorCallback(PrefixManager.get(prefixType, prefix));
    }

    /**
     * Create an enumeration element with name "prefixType".
     *
     * @param gs1CompanyPrefixOnly
     * If true, only the GS1 Company Prefix option is available.
     *
     * @returns
     * Enumeration element.
     */
    protected prefixTypeElement(gs1CompanyPrefixOnly: boolean): ReactElement {
        let prefixTypes: PrefixType[];

        if (gs1CompanyPrefixOnly) {
            prefixTypes = [PrefixType.GS1CompanyPrefix];
        } else if (this.props.identificationKeyType === IdentificationKeyType.GTIN) {
            prefixTypes = [PrefixType.GS1CompanyPrefix, PrefixType.UPCCompanyPrefix, PrefixType.GS18Prefix];
        } else {
            prefixTypes = [PrefixType.GS1CompanyPrefix, PrefixType.UPCCompanyPrefix];
        }

        return this.enumElement("prefixType", "Prefix type", prefixTypes, ["GS1 Company Prefix", "U.P.C. Company Prefix", "GS1-8 Prefix"], "Prefix type underlying the identification key.");
    }

    /**
     * Get enumeration input from an element with name "prefixType".
     *
     * @returns
     * Prefix type.
     */
    protected prefixTypeInput(): PrefixType {
        return this.enumInput("prefixType");
    }

    /**
     * Create a text element with name "prefix".
     *
     * @returns
     * Text element.
     */
    protected prefixElement(): ReactElement {
        return this.textElement("prefix", "Prefix", "Prefix underlying the identification key.");
    }

    /**
     * Get required string input from an element with name "prefix".
     *
     * @returns
     * Prefix.
     */
    protected prefixInput(): string {
        return this.requiredStringInput("prefix");
    }

    /**
     * Create a text element with name "identificationKey".
     *
     * @param label
     * Optional label; defaults to identification key type if undefined.
     *
     * @param text
     * Optional descriptive text; defaults to "to be validated" text if undefined.
     *
     * @returns
     * Text element.
     */
    protected identificationKeyElement(label?: string, text?: string): ReactElement {
        return this.textElement("identificationKey", label ?? this.props.identificationKeyType, text ?? `${this.props.identificationKeyType} to be validated.`);
    }

    /**
     * Get required string input from an element with name "identificationKey".
     *
     * @returns
     * Identification key.
     */
    protected identificationKeyInput(): string {
        return this.requiredStringInput("identificationKey");
    }

    /**
     * Create a text element with name "value".
     *
     * @returns
     * Text element.
     */
    protected valueElement(): ReactElement {
        return this.textElement("value", "Value", "Numeric value to be converted to reference.");
    }

    /**
     * Get required number input from an element with name "value".
     *
     * @returns
     * Value.
     */
    protected valueInput(): number {
        return this.requiredNumberInput("value");
    }
}

/**
 * Identification key validate form.
 */
class IdentificationKeyValidateForm extends IdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Validate";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        const numeric = this.getValidator(PrefixType.GS1CompanyPrefix).referenceCharacterSet === CharacterSet.Numeric;

        return <>
            {this.prefixTypeElement(this.props.identificationKeyType !== IdentificationKeyType.GTIN)}
            {this.identificationKeyElement()}
            {this.enumElement("exclusion", "Exclusion", numeric ? [Exclusion.None] : [Exclusion.None, Exclusion.AllNumeric], ["None", "First zero", "All numeric"], "Type of reference to be excluded from validation.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const identificationKey = this.identificationKeyInput();
        const exclusion = this.enumInput<Exclusion.None | Exclusion.AllNumeric>("exclusion");

        if (this.isValid) {
            const validation: IdentificationKeyValidation | NonNumericIdentificationKeyValidation = this.getValidator(prefixType).referenceCharacterSet === CharacterSet.Numeric ?
                {} :
                {
                    exclusion
                };

            this.getValidator(prefixType).validate(identificationKey, validation);
        }

        return this.isValid ? "✓" : undefined;
    }
}

/**
 * Identification key sub-menu.
 */
abstract class IdentificationKeySubMenu<V extends IdentificationKeyValidator, C extends V & IdentificationKeyCreator> extends AppComponent<IdentificationKeyProperties<V, C>> {
    /**
     * Get menu items for the identification key.
     *
     * @returns
     * Menu items element.
     */
    protected menuItems(): ReactElement {
        return <NavDropdown.Item onClick={() => {
            this.setDemoElement(
                <IdentificationKeyValidateForm
                    key={`${this.props.identificationKeyType}/Validate`}
                    {...this.props}
                />
            );
        }}>
            Validate
        </NavDropdown.Item>;
    }

    /**
     * @inheritDoc
     */
    override render(): ReactElement {
        return <NavDropdown title={this.props.identificationKeyType}>
            {this.menuItems()}
        </NavDropdown>;
    }
}

/**
 * Numeric identification key form.
 */
abstract class NumericIdentificationKeyForm<V extends NumericIdentificationKeyValidator = NumericIdentificationKeyValidator, C extends V & NumericIdentificationKeyCreator = V & NumericIdentificationKeyCreator> extends IdentificationKeyForm<V, C> {
    /**
     * Create a boolean element with name "sparse".
     *
     * @returns
     * Boolean element.
     */
    protected sparseElement(): ReactElement {
        return this.booleanElement("sparse", "Sparse", "If true, the value is mapped to a sparse sequence resistant to discovery.");
    }

    /**
     * Get boolean input from an element with name "sparse".
     *
     * @returns
     * Sparse.
     */
    protected sparseInput(): boolean {
        return this.booleanInput("sparse");
    }
}

/**
 * Numeric identification key create form.
 */
class NumericIdentificationKeyCreateForm extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Create";
    }

    /**
     * Get "identificationKey" as result element name.
     */
    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.prefixTypeElement(false)}
            {this.prefixElement()}
            {this.valueElement()}
            {this.sparseElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const value = this.valueInput();
        const sparse = this.sparseInput();

        return this.isValid ? this.getCreator(prefixType, prefix).create(value, sparse) : undefined;
    }
}

/**
 * Numeric identification key create sequence form.
 */
class NumericIdentificationKeyCreateSequenceForm extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Create sequence";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.prefixTypeElement(false)}
            {this.prefixElement()}
            {this.textElement("startValue", "Start value", "Start of numeric values to be converted to references.")}
            {this.textElement("count", "Count", "Count of numeric values to be converted to references.")}
            {this.sparseElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): IterableIterator<string> | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const startValue = this.requiredNumberInput("startValue");
        const count = this.requiredNumberInput("count");
        const sparse = this.sparseInput();

        return this.isValid && this.confirmCreateStrings(count) ? this.getCreator(prefixType, prefix).create(new Sequencer(startValue, count), sparse) : undefined;
    }
}

/**
 * Numeric identification key create all form.
 */
class NumericIdentificationKeyCreateAllForm extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Create all";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.prefixTypeElement(false)}
            {this.prefixElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): IterableIterator<string> | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();

        let result: IterableIterator<string> | undefined;

        if (this.isValid) {
            const creator = this.getCreator(prefixType, prefix);

            if (this.confirmCreateStrings(creator.capacity)) {
                result = creator.createAll();
            }
        }

        return result;
    }
}

/**
 * Numeric identification key sub-menu.
 */
class NumericIdentificationKeySubMenu<V extends NumericIdentificationKeyValidator = NumericIdentificationKeyValidator, C extends V & NumericIdentificationKeyCreator = V & NumericIdentificationKeyCreator> extends IdentificationKeySubMenu<V, C> {
    /**
     * @inheritDoc
     */
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <NumericIdentificationKeyCreateForm
                        key={`${this.props.identificationKeyType}/Create`}
                        {...this.props}
                    />
                );
            }}>
                Create
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <NumericIdentificationKeyCreateSequenceForm
                        key={`${this.props.identificationKeyType}/Create sequence`}
                        {...this.props}
                    />
                );
            }}>
                Create sequence
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <NumericIdentificationKeyCreateAllForm
                        key={`${this.props.identificationKeyType}/Create all`}
                        {...this.props}
                    />
                );
            }}>
                Create all
            </NavDropdown.Item>
        </>;
    }
}

/**
 * Zero-expand GTIN-12 form.
 */
class ZeroExpandGTIN12Form extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Zero expand GTIN-12";
    }

    /**
     * Get "identificationKey" as result element name.
     */
    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.textElement("zeroSuppressedGTIN12", "Zero-suppressed GTIN-12", "Zero-suppressed GTIN-12 to be expanded.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const zeroSuppressedGTIN12 = this.requiredStringInput("zeroSuppressedGTIN12");

        return this.isValid ? GTINValidator.zeroExpand(zeroSuppressedGTIN12) : undefined;
    }
}

/**
 * Zero-suppress GTIN-12 form.
 */
class ZeroSuppressGTIN12Form extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Zero suppress GTIN-12";
    }

    /**
     * Get "zeroSuppressedGTIN12" as result element name.
     */
    protected override get resultElementName(): string | undefined {
        return "zeroSuppressedGTIN12";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.identificationKeyElement("GTIN-12", "GTIN-12 to be zero-suppressed.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();

        return this.isValid ? GTINCreator.zeroSuppress(identificationKey) : undefined;
    }
}

/**
 * Validate any GTIN form.
 */
class ValidateAnyGTINForm extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Validate any";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.identificationKeyElement()}
            {this.enumElement("gtinLevel", "Level", [GTINLevel.Any, GTINLevel.RetailConsumer, GTINLevel.OtherThanRetailConsumer], ["Any", "Retail consumer", "Other than retail consumer"], "Level at which the GTIN is applied.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();
        const gtinLevel = this.enumInput<GTINLevel>("gtinLevel");

        if (this.isValid) {
            GTINValidator.validateAny(identificationKey, gtinLevel);
        }

        return this.isValid ? "✓" : undefined;
    }
}

/**
 * Validate GTIN-14 form.
 */
class ValidateGTIN14Form extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Validate GTIN-14";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.identificationKeyElement("GTIN-14", "GTIN-14 to be validated.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();

        if (this.isValid) {
            GTINValidator.validateGTIN14(identificationKey);
        }

        return this.isValid ? "✓" : undefined;
    }
}

/**
 * Convert to GTIN-14 form.
 */
class ConvertToGTIN14Form extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Convert to GTIN-14";
    }

    /**
     * Get "identificationKey" as result element name.
     */
    override get resultElementName(): string {
        return "identificationKey";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.textElement("indicatorDigit", "Indicator digit", "If provided, indicator digit to apply to GTIN-14.")}
            {this.identificationKeyElement("GTIN", "GTIN to be converted to GTIN-14.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const indicatorDigit = this.optionalStringInput("indicatorDigit");
        const identificationKey = this.identificationKeyInput();

        return this.isValid ? GTINCreator.convertToGTIN14(indicatorDigit, identificationKey) : undefined;
    }
}

/**
 * Normalize GTIN form.
 */
class NormalizeGTINForm extends NumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Normalize";
    }

    /**
     * Get "identificationKey" as result element name.
     */
    override get resultElementName(): string {
        return "identificationKey";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.identificationKeyElement("GTIN", "GTIN to be normalized.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();

        return this.isValid ? GTINCreator.normalize(identificationKey) : undefined;
    }
}

/**
 * GTIN sub-menu.
 */
class GTINSubMenu extends NumericIdentificationKeySubMenu<GTINValidator, GTINCreator> {
    /**
     * @inheritDoc
     */
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <ZeroExpandGTIN12Form
                        key={`${this.props.identificationKeyType}/Zero expand GTIN-12`}
                        {...this.props}
                    />
                );
            }}>
                Zero expand GTIN-12
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <ZeroSuppressGTIN12Form
                        key={`${this.props.identificationKeyType}/Zero suppress GTIN-12`}
                        {...this.props}
                    />
                );
            }}>
                Zero suppress GTIN-12
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <ValidateAnyGTINForm
                        key={`${this.props.identificationKeyType}/Validate any`}
                        {...this.props}
                    />
                );
            }}>
                Validate any
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <ValidateGTIN14Form
                        key={`${this.props.identificationKeyType}/Validate GTIN-14`}
                        {...this.props}
                    />
                );
            }}>
                Validate GTIN-14
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <ConvertToGTIN14Form
                        key={`${this.props.identificationKeyType}/Convert to GTIN-14`}
                        {...this.props}
                    />
                );
            }}>
                Convert to GTIN-14
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <NormalizeGTINForm
                        key={`${this.props.identificationKeyType}/Normalize`}
                        {...this.props}
                    />
                );
            }}>
                Normalize
            </NavDropdown.Item>
        </>;
    }
}

/**
 * Non-GTIN numeric identification key sub-menu.
 */
class NonGTINNumericIdentificationKeySubMenu extends NumericIdentificationKeySubMenu<NonGTINNumericIdentificationKeyValidator, NonGTINNumericIdentificationKeyCreator> {
}

/**
 * Serializable numeric identification key form.
 */
abstract class SerializableNumericIdentificationKeyForm extends NumericIdentificationKeyForm<SerializableNumericIdentificationKeyValidator, SerializableNumericIdentificationKeyCreator> {
    /**
     * Create a text element with name "serialComponent".
     *
     * @returns
     * Text element.
     */
    protected serialComponentElement(): ReactElement {
        return this.textElement("serialComponent", "Serial component", "Serial component of the identification key.");
    }

    /**
     * Get required string input from an element with name "serialComponent".
     *
     * @returns
     * Serial component.
     */
    protected serialComponentInput(): string {
        return this.requiredStringInput("serialComponent");
    }
}

/**
 * Serializable numeric identification key create serialized form.
 */
class SerializableNumericIdentificationKeyCreateSerializedForm extends SerializableNumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Create serialized";
    }

    /**
     * Get "identificationKey" as result element name.
     */
    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.prefixTypeElement(false)}
            {this.prefixElement()}
            {this.valueElement()}
            {this.sparseElement()}
            {this.serialComponentElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const value = this.valueInput();
        const sparse = this.sparseInput();
        const serialComponent = this.serialComponentInput();

        return this.isValid ? this.getCreator(prefixType, prefix).createSerialized(value, serialComponent, sparse) : undefined;
    }
}

/**
 * Serializable numeric identification key concatenate form.
 */
class SerializableNumericIdentificationKeyConcatenateForm extends SerializableNumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Concatenate";
    }

    /**
     * Get "identificationKey" as result element name.
     */
    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.identificationKeyElement(`Base ${this.props.identificationKeyType}`, `Base ${this.props.identificationKeyType} to which to concatenate serial component.`)}
            {this.serialComponentElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();
        const serialComponent = this.serialComponentInput();

        return this.isValid ? this.getCreator(PrefixType.GS1CompanyPrefix, "9521234").concatenate(identificationKey, serialComponent) : undefined;
    }
}

/**
 * Serializable numeric identification key sub-menu.
 */
class SerializableNumericIdentificationKeySubMenu extends NumericIdentificationKeySubMenu<SerializableNumericIdentificationKeyValidator, SerializableNumericIdentificationKeyCreator> {
    /**
     * @inheritDoc
     */
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <SerializableNumericIdentificationKeyCreateSerializedForm
                        key={`${this.props.identificationKeyType}/Create serialized`}
                        {...this.props}
                    />
                );
            }}>
                Create serialized
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <SerializableNumericIdentificationKeyConcatenateForm
                        key={`${this.props.identificationKeyType}/Concatenate`}
                        {...this.props}
                    />
                );
            }}>
                Concatenate
            </NavDropdown.Item>
        </>;
    }
}

/**
 * Non-numeric identification key form.
 */
abstract class NonNumericIdentificationKeyForm extends IdentificationKeyForm<NonNumericIdentificationKeyValidator, NonNumericIdentificationKeyCreator> {
}

/**
 * Non-numeric identification key create form.
 */
class NonNumericIdentificationKeyCreateForm extends NonNumericIdentificationKeyForm {
    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Create";
    }

    /**
     * Get "identificationKey" as result element name.
     */
    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.prefixTypeElement(false)}
            {this.prefixElement()}
            {this.textElement("reference", "Reference", "Reference to be appended to prefix.")}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const reference = this.requiredStringInput("reference");

        return this.isValid ? this.getCreator(prefixType, prefix).create(reference) : undefined;
    }
}

/**
 * Non-numeric identification key sub-menu.
 */
class NonNumericIdentificationKeySubMenu extends IdentificationKeySubMenu<NonNumericIdentificationKeyValidator, NonNumericIdentificationKeyCreator> {
    /**
     * @inheritDoc
     */
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Item onClick={() => {
                this.setDemoElement(
                    <NonNumericIdentificationKeyCreateForm
                        key={`${this.props.identificationKeyType}/Create`}
                        {...this.props}
                    />
                );
            }}>
                Create
            </NavDropdown.Item>
        </>;
    }
}

/**
 * GS1 identification key menu.
 */
export class GS1IDKeyMenu extends AppComponent {
    /**
     * @inheritDoc
     */
    override render(): ReactElement {
        return <NavDropdown title="GS1 ID Key">
            <GTINSubMenu
                identificationKeyType={IdentificationKeyType.GTIN}
                validatorOrValidators={GTIN_VALIDATORS}
                creatorCallback={prefixManager => prefixManager.gtinCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GLN}
                validatorOrValidators={GLN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.glnCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.SSCC}
                validatorOrValidators={SSCC_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.ssccCreator}
            />
            <SerializableNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GRAI}
                validatorOrValidators={GRAI_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.graiCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GIAI}
                validatorOrValidators={GIAI_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.giaiCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GSRN}
                validatorOrValidators={GSRN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gsrnCreator}
            />
            <SerializableNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GDTI}
                validatorOrValidators={GDTI_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gdtiCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GINC}
                validatorOrValidators={GINC_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gincCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GSIN}
                validatorOrValidators={GSIN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gsinCreator}
            />
            <SerializableNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GCN}
                validatorOrValidators={GCN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gcnCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.CPID}
                validatorOrValidators={CPID_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.cpidCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GMN}
                validatorOrValidators={GMN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gmnCreator}
            />
        </NavDropdown>;
    }
}
