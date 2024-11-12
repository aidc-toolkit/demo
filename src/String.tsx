import { AI39_CREATOR, AI82_CREATOR } from "@aidc-toolkit/gs1";
import {
    ALPHABETIC_CREATOR,
    ALPHANUMERIC_CREATOR,
    CharacterSetCreator,
    Exclusion,
    HEXADECIMAL_CREATOR,
    NUMERIC_CREATOR,
    Sequencer
} from "@aidc-toolkit/utility";
import { type ComponentClass, createElement, type ReactElement } from "react";
import { NavDropdown } from "react-bootstrap";

import { AppComponent } from "./app_context.ts";
import { DemoForm } from "./Demo.tsx";

/**
 * Character set properties.
 */
interface CharacterSetProperties {
    /**
     * Name.
     */
    name: string;

    /**
     * Creator.
     */
    creator: CharacterSetCreator;
}

/**
 * Character set form.
 */
abstract class CharacterSetForm extends DemoForm<CharacterSetProperties> {
    /**
     * @inheritDoc
     */
    protected get title(): string {
        return `${this.props.name} String`;
    }

    /**
     * Create a text element with name "s".
     *
     * @param text
     * Descriptive text.
     *
     * @returns
     * Text element.
     */
    protected sElement(text: string): ReactElement {
        return this.textElement("s", "", text);
    }

    /**
     * Get optional string input from an element with name "s".
     *
     * @returns
     * Possibly empty string.
     */
    protected sInput(): string {
        return this.optionalStringInput("s");
    }

    /**
     * Create a text element with name "length".
     *
     * @returns
     * Text element.
     */
    protected lengthElement(): ReactElement {
        return this.textElement("length", "Length", `Length must be from 0-${CharacterSetCreator.MAXIMUM_STRING_LENGTH.toLocaleString()}.`);
    }

    /**
     * Get required number input from an element with name "length".
     *
     * @returns
     * Length.
     */
    protected lengthInput(): number {
        return this.requiredNumberInput("length");
    }

    /**
     * Create an enumeration element with name "exclusion".
     *
     * @returns
     * Enumeration element.
     */
    protected exclusionElement(): ReactElement {
        return this.enumElement("exclusion", "Exclusion", [Exclusion.None, ...this.props.creator.exclusionSupport], ["None", "First zero", "All numeric"], "Type of string to be excluded from creation.");
    }

    /**
     * Get enumeration input from an element with name "exclusion".
     *
     * @returns
     * Exclusion.
     */
    protected exclusionInput(): Exclusion {
        return this.enumInput("exclusion");
    }

    /**
     * Create a text element with name "tweak".
     *
     * @returns
     * Text element.
     */
    protected tweakElement(): ReactElement {
        return this.textElement("tweak", "Tweak", "If provided, the numerical value of the string \"tweaked\" by this value using an encryption transformer.");
    }

    /**
     * Get optional number input from an element with name "tweak".
     *
     * @returns
     * Tweak or undefined.
     */
    protected tweakInput(): number | undefined {
        return this.optionalNumberInput("tweak");
    }
}

/**
 * Character set validate form.
 */
class CharacterSetValidateForm extends CharacterSetForm {
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
        return <>
            {this.sElement(`${this.props.name} string to validate.`)}
            {this.textElement("minimumLength", "Minimum length", `If provided, the minimum length of the ${this.props.name.toLowerCase()} string.`)}
            {this.textElement("maximumLength", "Maximum length", `If provided, the maximum length of the ${this.props.name.toLowerCase()} string.`)}
            {this.exclusionElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const s = this.sInput();
        const minimumLength = this.optionalNumberInput("minimumLength");
        const maximumLength = this.optionalNumberInput("maximumLength");
        const exclusion = this.exclusionInput();

        if (this.isValid) {
            this.props.creator.validate(s, {
                minimumLength,
                maximumLength,
                exclusion
            });
        }

        return this.isValid ? "✓" : undefined;
    }
}

/**
 * Character set create form.
 */
class CharacterSetCreateForm extends CharacterSetForm {
    /**
     * Get "s" as result element name.
     */
    protected override get resultElementName(): string {
        return "s";
    }

    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Create";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.lengthElement()}
            {this.textElement("value", "Value", `Numeric value to be converted to equivalent ${this.props.name} string.`)}
            {this.exclusionElement()}
            {this.tweakElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const length = this.lengthInput();
        const value = this.requiredNumberInput("value");
        const exclusion = this.exclusionInput();
        const tweak = this.tweakInput();

        return this.isValid ? this.props.creator.create(length, value, exclusion, tweak) : undefined;
    }
}

/**
 * Character set create sequence form.
 */
class CharacterSetCreateSequenceForm extends CharacterSetForm {
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
            {this.lengthElement()}
            {this.textElement("startValue", "Start value", `Start of numeric values to be converted to equivalent ${this.props.name} strings.`)}
            {this.textElement("count", "Count", `Count of numeric values to be converted to equivalent ${this.props.name} strings.`)}
            {this.exclusionElement()}
            {this.tweakElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): IterableIterator<string> | undefined {
        const length = this.lengthInput();
        const startValue = this.requiredNumberInput("startValue");
        const count = this.requiredNumberInput("count");
        const exclusion = this.exclusionInput();
        const tweak = this.tweakInput();

        return this.isValid && this.confirmCreateStrings(count) ? this.props.creator.create(length, new Sequencer(startValue, count), exclusion, tweak) : undefined;
    }
}

/**
 * Character set value form.
 */
class CharacterSetValueForm extends CharacterSetForm {
    /**
     * Get "value" as result element name.
     */
    protected override get resultElementName(): string {
        return "value";
    }

    /**
     * @inheritDoc
     */
    protected get subtitle(): string {
        return "Value";
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.sElement(`${this.props.name} string to convert back to numeric value.`)}
            {this.exclusionElement()}
            {this.tweakElement()}
        </>;
    }

    /**
     * @inheritDoc
     */
    protected processForm(): string | undefined {
        const s = this.sInput();
        const exclusion = this.exclusionInput();
        const tweak = this.tweakInput();

        return this.isValid ? this.props.creator.valueFor(s, exclusion, tweak).toString() : undefined;
    }
}

/**
 * Character set form descriptor.
 */
interface CharacterSetFormDescriptor {
    /**
     * Name.
     */
    name: string;

    /**
     * Form component class.
     */
    form: ComponentClass<CharacterSetProperties>;
}

/**
 * String menu.
 */
export class StringMenu extends AppComponent {
    /**
     * Character sets properties. Used to build first-level sub-menu.
     */
    private static readonly CHARACTER_SETS_PROPERTIES: readonly CharacterSetProperties[] = [
        {
            name: "Numeric",
            creator: NUMERIC_CREATOR
        },
        {
            name: "Hexadecimal",
            creator: HEXADECIMAL_CREATOR
        },
        {
            name: "Alphabetic",
            creator: ALPHABETIC_CREATOR
        },
        {
            name: "Alphanumeric",
            creator: ALPHANUMERIC_CREATOR
        },
        {
            name: "GS1 AI 82",
            creator: AI82_CREATOR
        },
        {
            name: "GS1 AI 39",
            creator: AI39_CREATOR
        }
    ];

    /**
     * Character set form descriptors. Used to build second-level sub-menu.
     */
    private static readonly CHARACTER_SET_FORM_DESCRIPTORS: readonly CharacterSetFormDescriptor[] = [
        {
            name: "Validate",
            form: CharacterSetValidateForm
        },
        {
            name: "Create",
            form: CharacterSetCreateForm
        },
        {
            name: "Create sequence",
            form: CharacterSetCreateSequenceForm
        },
        {
            name: "Value",
            form: CharacterSetValueForm
        }
    ];

    /**
     * @inheritDoc
     */
    override render(): ReactElement {
        return <NavDropdown title="String">
            {
                StringMenu.CHARACTER_SETS_PROPERTIES.map(characterSetDescriptor => <NavDropdown
                    key={characterSetDescriptor.name}
                    title={characterSetDescriptor.name}>
                    {
                        StringMenu.CHARACTER_SET_FORM_DESCRIPTORS.map(characterSetFormDescriptor => <NavDropdown.Item
                            key={characterSetFormDescriptor.name}
                            onClick={() => {
                                this.setDemoElement(createElement(characterSetFormDescriptor.form, {
                                    key: `${characterSetDescriptor.name}/${characterSetFormDescriptor.name}`,
                                    ...characterSetDescriptor
                                }));
                            }}>
                            {characterSetFormDescriptor.name}
                        </NavDropdown.Item>)
                    }
                </NavDropdown>)
            }
        </NavDropdown>;
    }
}
