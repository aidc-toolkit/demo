import { AI39_CREATOR, AI82_CREATOR } from "@aidc-toolkit/gs1";
import {
    ALPHABETIC_CREATOR,
    ALPHANUMERIC_CREATOR,
    CharacterSetCreator,
    Exclusion,
    HEXADECIMAL_CREATOR,
    NUMERIC_CREATOR
} from "@aidc-toolkit/utility";
import { type ComponentClass, createElement, type ReactElement } from "react";
import { NavDropdown } from "react-bootstrap";

import { AppComponent } from "./app_context.ts";
import { DemoForm } from "./Demo.tsx";

interface CharacterSetProperties {
    name: string;
    creator: CharacterSetCreator;
}

abstract class CharacterSetForm extends DemoForm<CharacterSetProperties> {
    protected get title(): string {
        return `${this.props.name} String`;
    }

    protected sElement(text: string): ReactElement {
        return this.textElement("s", "S", text);
    }

    protected sInput(): string {
        return this.optionalStringInput("s");
    }

    protected lengthElement(): ReactElement {
        return this.textElement("length", "Length", `Length must be from 1-${CharacterSetCreator.MAXIMUM_STRING_LENGTH.toLocaleString()}.`);
    }

    protected lengthInput(): number {
        return this.requiredNumberInput("length");
    }

    protected exclusionElement(): ReactElement {
        return this.enumElement("exclusion", "Exclusion", [Exclusion.None, ...this.props.creator.exclusionSupport], ["None", "First zero", "All numeric"], "Type of string to be excluded from creation.");
    }

    protected exclusionInput(): Exclusion {
        return this.enumInput("exclusion");
    }

    protected tweakElement(): ReactElement {
        return this.textElement("tweak", "Tweak", "If provided, the numerical value of the string \"tweaked\" by this value using an encryption transformer.");
    }

    protected tweakInput(): number | undefined {
        return this.optionalNumberInput("tweak");
    }
}

class CharacterSetValidateForm extends CharacterSetForm {
    get subtitle(): string {
        return "Validate";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.sElement(`${this.props.name} string to validate.`) }
            { this.textElement("minimumLength", "Minimum length", `If provided, the minimum length of the ${this.props.name.toLowerCase()} string.`) }
            { this.textElement("maximumLength", "Maximum length", `If provided, the maximum length of the ${this.props.name.toLowerCase()} string.`) }
            { this.exclusionElement() }
        </>;
    }

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

class CharacterSetCreateForm extends CharacterSetForm {
    protected override get resultElementName(): string {
        return "s";
    }

    get subtitle(): string {
        return "Create";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.lengthElement() }
            { this.textElement("value", "Value", `Numeric value to be converted to equivalent ${this.props.name} string.`) }
            { this.exclusionElement() }
            { this.tweakElement() }
        </>;
    }

    protected processForm(): string | undefined {
        const length = this.lengthInput();
        const value = this.requiredNumberInput("value");
        const exclusion = this.exclusionInput();
        const tweak = this.tweakInput();

        return this.isValid ? this.props.creator.create(length, value, exclusion, tweak) : undefined;
    }
}

class CharacterSetCreateSequenceForm extends CharacterSetForm {
    get subtitle(): string {
        return "Create sequence";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.lengthElement() }
            { this.textElement("startValue", "Start value", `Start of numeric values to be converted to equivalent ${this.props.name} strings.`) }
            { this.textElement("count", "Count", `Count of numeric values to be converted to equivalent ${this.props.name} strings.`) }
            { this.exclusionElement() }
            { this.tweakElement() }
        </>;
    }

    protected processForm(): IterableIterator<string> | undefined {
        const length = this.lengthInput();
        const startValue = this.requiredNumberInput("startValue");
        const count = this.requiredNumberInput("count");
        const exclusion = this.exclusionInput();
        const tweak = this.tweakInput();

        return this.isValid && this.confirmCreateStrings(count) ? this.props.creator.createSequence(length, startValue, count, exclusion, tweak) : undefined;
    }
}

class CharacterSetValueForm extends CharacterSetForm {
    protected override get resultElementName(): string {
        return "value";
    }

    get subtitle(): string {
        return "Value";
    }

    protected renderParameters(): ReactElement {
        return <>
            { this.textElement("s", "S", `${this.props.name} string to convert back to numeric value.`) }
            { this.exclusionElement() }
            { this.tweakElement() }
        </>;
    }

    protected processForm(): string | undefined {
        const s = this.sInput();
        const exclusion = this.exclusionInput();
        const tweak = this.tweakInput();

        return this.isValid ? this.props.creator.value(s, exclusion, tweak).toString() : undefined;
    }
}

interface CharacterSetFormDescriptor {
    name: string;
    form: ComponentClass<CharacterSetProperties>;
}

export class StringMenu extends AppComponent {
    private static readonly CHARACTER_SET_PROPERTIES: readonly CharacterSetProperties[] = [
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

    override render(): ReactElement {
        return <NavDropdown title="String">
            {
                StringMenu.CHARACTER_SET_PROPERTIES.map(characterSetDescriptor => <NavDropdown
                    key={characterSetDescriptor.name}
                    title={characterSetDescriptor.name}>
                    {
                        StringMenu.CHARACTER_SET_FORM_DESCRIPTORS.map(characterSetFormDescriptor => <NavDropdown.Item
                            key={characterSetFormDescriptor.name}
                            onClick={() => {
                                this.context.setDemoElement(createElement(characterSetFormDescriptor.form, {
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
