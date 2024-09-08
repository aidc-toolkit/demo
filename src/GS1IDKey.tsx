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
import { Exclusion } from "@aidc-toolkit/utility";
import type { ReactElement } from "react";
import { NavDropdown } from "react-bootstrap";

import { AppComponent } from "./app_context.ts";
import { DemoForm } from "./Demo.tsx";

interface IdentificationKeyProperties<V extends IdentificationKeyValidator, C extends V & IdentificationKeyCreator> {
    identificationKeyType: IdentificationKeyType;
    validators: V | V[];
    creatorCallback: (prefixManager: PrefixManager) => C;
}

abstract class IdentificationKeyForm<V extends IdentificationKeyValidator = IdentificationKeyValidator, C extends V & IdentificationKeyCreator = V & IdentificationKeyCreator> extends DemoForm<IdentificationKeyProperties<V, C>> {
    protected get title(): string {
        return this.props.identificationKeyType;
    }

    protected getValidator(prefixType: PrefixType): V {
        const validators = this.props.validators;

        return Array.isArray(validators) ? validators[prefixType] : validators;
    }

    protected getCreator(prefixType: PrefixType, prefix: string): C {
        return this.props.creatorCallback(PrefixManager.get(prefixType, prefix));
    }

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

    protected prefixTypeInput(): PrefixType {
        return this.enumInput("prefixType");
    }

    protected prefixElement(): ReactElement {
        return this.textElement("prefix", "Prefix", "Prefix underlying the identification key.");
    }

    protected prefixInput(): string {
        return this.requiredStringInput("prefix");
    }

    protected identificationKeyElement(label?: string, text?: string): ReactElement {
        return this.textElement("identificationKey", label ?? this.props.identificationKeyType, text ?? `${this.props.identificationKeyType} to be validated.`);
    }

    protected identificationKeyInput(): string {
        return this.requiredStringInput("identificationKey");
    }

    protected valueElement(): ReactElement {
        return this.textElement("value", "Value", "Numeric value to be converted to reference.");
    }

    protected valueInput(): number {
        return this.requiredNumberInput("value");
    }
}

class IdentificationKeyValidateForm extends IdentificationKeyForm {
    get subtitle(): string {
        return "Validate";
    }

    protected renderParameters(): ReactElement {
        const numeric = this.getValidator(PrefixType.GS1CompanyPrefix).referenceCharacterSet === CharacterSet.Numeric;

        return <>
            { this.prefixTypeElement(this.props.identificationKeyType !== IdentificationKeyType.GTIN) }
            { this.identificationKeyElement() }
            { this.enumElement("exclusion", "Exclusion", numeric ? [Exclusion.None] : [Exclusion.None, Exclusion.AllNumeric], ["None", "First zero", "All numeric"], "Type of reference to be excluded from validation.") }
        </>;
    }

    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const identificationKey = this.identificationKeyInput();
        const exclusion = this.enumInput<Exclusion.None | Exclusion.AllNumeric>("exclusion");

        if (this.isValid) {
            const validator = this.getValidator(prefixType);
            const numeric = validator.referenceCharacterSet === CharacterSet.Numeric;
            const validation: IdentificationKeyValidation | NonNumericIdentificationKeyValidation = numeric ?
                {} :
                {
                    exclusion
                };

            validator.validate(identificationKey, validation);
        }

        return this.isValid ? "✓" : undefined;
    }
}

abstract class IdentificationKeySubMenu<V extends IdentificationKeyValidator, C extends V & IdentificationKeyCreator> extends AppComponent<IdentificationKeyProperties<V, C>> {
    protected menuItems(): ReactElement {
        return <NavDropdown.Item onClick={() => {
            this.context.setDemoElement(
                <IdentificationKeyValidateForm
                    key={`${this.props.identificationKeyType}/Validate`}
                    {...this.props}
                />
            );
        }}>
            Validate
        </NavDropdown.Item>;
    }

    override render(): ReactElement {
        return <NavDropdown title={this.props.identificationKeyType}>
            {this.menuItems()}
        </NavDropdown>;
    }
}

abstract class NumericIdentificationKeyForm<V extends NumericIdentificationKeyValidator = NumericIdentificationKeyValidator, C extends V & NumericIdentificationKeyCreator = V & NumericIdentificationKeyCreator> extends IdentificationKeyForm<V, C> {
    protected sparseElement(): ReactElement {
        return this.booleanElement("sparse", "Sparse", "If true, the value is mapped to a sparse sequence resistant to discovery.");
    }

    protected sparseInput(): boolean {
        return this.booleanInput("sparse");
    }
}

class NumericIdentificationKeyCreateForm extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Create";
    }

    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.prefixTypeElement(false) }
            { this.prefixElement() }
            { this.valueElement() }
            { this.sparseElement() }
        </>;
    }

    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const value = this.valueInput();
        const sparse = this.sparseInput();

        return this.isValid ? this.getCreator(prefixType, prefix).create(value, sparse) : undefined;
    }
}

class NumericIdentificationKeyCreateSequenceForm extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Create sequence";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.prefixTypeElement(false) }
            { this.prefixElement() }
            { this.textElement("startValue", "Start value", "Start of numeric values to be converted to references.") }
            { this.textElement("count", "Count", "Count of numeric values to be converted to references.") }
            { this.sparseElement() }
        </>;
    }

    protected processForm(): IterableIterator<string> | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const startValue = this.requiredNumberInput("startValue");
        const count = this.requiredNumberInput("count");
        const sparse = this.sparseInput();

        return this.isValid && this.confirmCreateStrings(count) ? this.getCreator(prefixType, prefix).createSequence(startValue, count, sparse) : undefined;
    }
}

class NumericIdentificationKeyCreateAllForm extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Create all";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.prefixTypeElement(false) }
            { this.prefixElement() }
        </>;
    }

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

class NumericIdentificationKeySubMenu<V extends NumericIdentificationKeyValidator = NumericIdentificationKeyValidator, C extends V & NumericIdentificationKeyCreator = V & NumericIdentificationKeyCreator> extends IdentificationKeySubMenu<V, C> {
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
                    <NumericIdentificationKeyCreateForm
                        key={`${this.props.identificationKeyType}/Create`}
                        {...this.props}
                    />
                );
            }}>
                Create
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
                    <NumericIdentificationKeyCreateSequenceForm
                        key={`${this.props.identificationKeyType}/Create sequence`}
                        {...this.props}
                    />
                );
            }}>
                Create sequence
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
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

class ZeroExpandGTIN12Form extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Zero expand GTIN-12";
    }

    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.textElement("zeroSuppressedGTIN12", "Zero-suppressed GTIN-12", "Zero-suppressed GTIN-12 to be expanded.") }
        </>;
    }

    protected processForm(): string | undefined {
        const zeroSuppressedGTIN12 = this.requiredStringInput("zeroSuppressedGTIN12");

        return this.isValid ? GTINValidator.zeroExpand(zeroSuppressedGTIN12) : undefined;
    }
}

class ZeroSuppressGTIN12Form extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Zero suppress GTIN-12";
    }

    protected override get resultElementName(): string | undefined {
        return "zeroSuppressedGTIN12";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.identificationKeyElement("GTIN-12", "GTIN-12 to be zero-suppressed.") }
        </>;
    }

    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();

        return this.isValid ? GTINCreator.zeroSuppress(identificationKey) : undefined;
    }
}

class ValidateAnyGTINForm extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Validate any";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.identificationKeyElement() }
            { this.enumElement("gtinLevel", "Level", [GTINLevel.Any, GTINLevel.RetailConsumer, GTINLevel.OtherThanRetailConsumer], ["Any", "Retail consumer", "Other than retail consumer"], "Level at which the GTIN is applied.") }
        </>;
    }

    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();
        const gtinLevel = this.enumInput<GTINLevel>("gtinLevel");

        if (this.isValid) {
            GTINValidator.validateAny(identificationKey, gtinLevel);
        }

        return this.isValid ? "✓" : undefined;
    }
}

class ValidateGTIN14Form extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Validate GTIN-14";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.identificationKeyElement("GTIN-14", "GTIN-14 to be validated.") }
        </>;
    }

    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();

        if (this.isValid) {
            GTINValidator.validateGTIN14(identificationKey);
        }

        return this.isValid ? "✓" : undefined;
    }
}

class ConvertToGTIN14Form extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Convert to GTIN-14";
    }

    override get resultElementName(): string {
        return "identificationKey";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.textElement("indicatorDigit", "Indicator digit", "If provided, indicator digit to apply to GTIN-14.") }
            { this.identificationKeyElement("GTIN", "GTIN to be converted to GTIN-14.") }
        </>;
    }

    protected processForm(): string | undefined {
        const indicatorDigit = this.optionalStringInput("indicatorDigit");
        const identificationKey = this.identificationKeyInput();

        return this.isValid ? GTINCreator.convertToGTIN14(indicatorDigit, identificationKey) : undefined;
    }
}

class NormalizeGTINForm extends NumericIdentificationKeyForm {
    get subtitle(): string {
        return "Normalize";
    }

    override get resultElementName(): string {
        return "identificationKey";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.identificationKeyElement("GTIN", "GTIN to be normalized.") }
        </>;
    }

    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();

        return this.isValid ? GTINCreator.normalize(identificationKey) : undefined;
    }
}

class GTINSubMenu extends NumericIdentificationKeySubMenu<GTINValidator, GTINCreator> {
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
                    <ZeroExpandGTIN12Form
                        key={`${this.props.identificationKeyType}/Zero expand GTIN-12`}
                        {...this.props}
                    />
                );
            }}>
                Zero expand GTIN-12
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
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
                this.context.setDemoElement(
                    <ValidateAnyGTINForm
                        key={`${this.props.identificationKeyType}/Validate any`}
                        {...this.props}
                    />
                );
            }}>
                Validate any
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
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
                this.context.setDemoElement(
                    <ConvertToGTIN14Form
                        key={`${this.props.identificationKeyType}/Convert to GTIN-14`}
                        {...this.props}
                    />
                );
            }}>
                Convert to GTIN-14
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
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

class NonGTINNumericIdentificationKeySubMenu extends NumericIdentificationKeySubMenu<NonGTINNumericIdentificationKeyValidator, NonGTINNumericIdentificationKeyCreator> {
}

abstract class SerializableNumericIdentificationKeyForm extends NumericIdentificationKeyForm<SerializableNumericIdentificationKeyValidator, SerializableNumericIdentificationKeyCreator> {
    protected serialComponentElement(): ReactElement {
        return this.textElement("serialComponent", "Serial component", "Serial component of the identification key.");
    }

    protected serialComponentInput(): string {
        return this.requiredStringInput("serialComponent");
    }
}

class SerializableNumericIdentificationKeyCreateSerializedForm extends SerializableNumericIdentificationKeyForm {
    get subtitle(): string {
        return "Create serialized";
    }

    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.prefixTypeElement(false) }
            { this.prefixElement() }
            { this.valueElement() }
            { this.sparseElement() }
            { this.serialComponentElement() }
        </>;
    }

    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const value = this.valueInput();
        const sparse = this.sparseInput();
        const serialComponent = this.serialComponentInput();

        return this.isValid ? this.getCreator(prefixType, prefix).createSerialized(value, serialComponent, sparse) : undefined;
    }
}

class SerializableNumericIdentificationKeyConcatenateForm extends SerializableNumericIdentificationKeyForm {
    get subtitle(): string {
        return "Concatenate";
    }

    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.identificationKeyElement(`Base ${this.props.identificationKeyType}`, `Base ${this.props.identificationKeyType} to which to concatenate serial component.`) }
            { this.serialComponentElement() }
        </>;
    }

    protected processForm(): string | undefined {
        const identificationKey = this.identificationKeyInput();
        const serialComponent = this.serialComponentInput();

        return this.isValid ? this.getCreator(PrefixType.GS1CompanyPrefix, "9521234").concatenate(identificationKey, serialComponent) : undefined;
    }
}

class SerializableNumericIdentificationKeySubMenu extends NumericIdentificationKeySubMenu<SerializableNumericIdentificationKeyValidator, SerializableNumericIdentificationKeyCreator> {
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
                    <SerializableNumericIdentificationKeyCreateSerializedForm
                        key={`${this.props.identificationKeyType}/Create serialized`}
                        {...this.props}
                    />
                );
            }}>
                Create serialized
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
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

abstract class NonNumericIdentificationKeyForm extends IdentificationKeyForm<NonNumericIdentificationKeyValidator, NonNumericIdentificationKeyCreator> {
}

class NonNumericIdentificationKeyCreateForm extends NonNumericIdentificationKeyForm {
    get subtitle(): string {
        return "Create";
    }

    protected override get resultElementName(): string | undefined {
        return "identificationKey";
    }

    protected override valueElement(): ReactElement {
        return this.textElement("value", "Value", "Numeric value to be converted to reference.");
    }

    protected override valueInput(): number {
        return this.requiredNumberInput("value");
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.prefixTypeElement(false) }
            { this.prefixElement() }
            { this.textElement("reference", "Reference", "Reference to be appended to prefix.") }
        </>;
    }

    protected processForm(): string | undefined {
        const prefixType = this.prefixTypeInput();
        const prefix = this.prefixInput();
        const reference = this.requiredStringInput("reference");

        return this.isValid ? this.getCreator(prefixType, prefix).create(reference) : undefined;
    }
}

class NonNumericIdentificationKeySubMenu extends IdentificationKeySubMenu<NonNumericIdentificationKeyValidator, NonNumericIdentificationKeyCreator> {
    protected override menuItems(): ReactElement {
        return <>
            {super.menuItems()}
            <NavDropdown.Item onClick={() => {
                this.context.setDemoElement(
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

export class GS1IDKeyMenu extends AppComponent {
    override render(): ReactElement {
        return <NavDropdown title="GS1 ID Key">
            <GTINSubMenu
                identificationKeyType={IdentificationKeyType.GTIN}
                validators={GTIN_VALIDATORS}
                creatorCallback={prefixManager => prefixManager.gtinCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GLN}
                validators={GLN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.glnCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.SSCC}
                validators={SSCC_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.ssccCreator}
            />
            <SerializableNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GRAI}
                validators={GRAI_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.graiCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GIAI}
                validators={GIAI_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.giaiCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GSRN}
                validators={GSRN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gsrnCreator}
            />
            <SerializableNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GDTI}
                validators={GDTI_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gdtiCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GINC}
                validators={GINC_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gincCreator}
            />
            <NonGTINNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GSIN}
                validators={GSIN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gsinCreator}
            />
            <SerializableNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GCN}
                validators={GCN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gcnCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.CPID}
                validators={CPID_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.cpidCreator}
            />
            <NonNumericIdentificationKeySubMenu
                identificationKeyType={IdentificationKeyType.GMN}
                validators={GMN_VALIDATOR}
                creatorCallback={prefixManager => prefixManager.gmnCreator}
            />
        </NavDropdown>;
    }
}
