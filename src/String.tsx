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
import i18next, { demoNS } from "./locale/i18n.js";

/**
 * Character set properties.
 */
interface CharacterSetProperties {
    /**
     * Resource name.
     */
    resourceName: string;

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
        return i18next.t("String.characterSetTitle", {
            ns: demoNS,
            name: i18next.t(this.props.resourceName, {
                ns: demoNS
            })
        });
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
        return this.textElement("length", i18next.t("String.lengthLabel", {
            ns: demoNS
        }), i18next.t("String.lengthText", {
            ns: demoNS,
            maximumLength: CharacterSetCreator.MAXIMUM_STRING_LENGTH
        }));
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
        return this.enumElement("exclusion", i18next.t("String.exclusionLabel", {
            ns: demoNS
        }), [Exclusion.None, ...this.props.creator.exclusionSupport], [i18next.t("String.exclusionNoneLabel", {
            ns: demoNS
        }), i18next.t("String.exclusionFirstZeroLabel", {
            ns: demoNS
        }), i18next.t("String.exclusionAllNumericLabel", {
            ns: demoNS
        })], i18next.t("String.exclusionText", {
            ns: demoNS
        }));
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
        return this.textElement("tweak", i18next.t("String.tweakLabel", {
            ns: demoNS
        }), i18next.t("String.tweakText", {
            ns: demoNS
        }));
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
        return i18next.t("String.validateSubtitle", {
            ns: demoNS
        });
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.sElement(i18next.t("String.stringToValidate", {
                ns: demoNS,
                name: i18next.t(this.props.resourceName, {
                    ns: demoNS
                })
            }))}
            {this.textElement("minimumLength", i18next.t("String.minimumLengthLabel", {
                ns: demoNS
            }), i18next.t("String.minimumLengthText", {
                ns: demoNS,
                name: i18next.t(this.props.resourceName, {
                    ns: demoNS
                })
            }))}
            {this.textElement("maximumLength", i18next.t("String.maximumLengthLabel", {
                ns: demoNS
            }), i18next.t("String.maximumLengthText", {
                ns: demoNS,
                name: i18next.t(this.props.resourceName, {
                    ns: demoNS
                })
            }))}
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
        return i18next.t("String.createSubtitle", {
            ns: demoNS
        });
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.lengthElement()}
            {this.textElement("value", i18next.t("String.valueLabel", {
                ns: demoNS
            }), i18next.t("String.valueText", {
                ns: demoNS,
                name: i18next.t(this.props.resourceName, {
                    ns: demoNS
                })
            }))}
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
        return i18next.t("String.createSequenceSubtitle", {
            ns: demoNS
        });
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.lengthElement()}
            {this.textElement("startValue", i18next.t("String.startValueLabel", {
                ns: demoNS
            }), i18next.t("String.startValueText", {
                ns: demoNS,
                name: i18next.t(this.props.resourceName, {
                    ns: demoNS
                })
            }))}
            {this.textElement("count", i18next.t("String.countLabel", {
                ns: demoNS
            }), i18next.t("String.countText", {
                ns: demoNS,
                name: i18next.t(this.props.resourceName, {
                    ns: demoNS
                })
            }))}
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
        return i18next.t("String.valueSubtitle", {
            ns: demoNS
        });
    }

    /**
     * @inheritDoc
     */
    protected renderParameters(): ReactElement {
        return <>
            {this.sElement(i18next.t("String.stringToConvert", {
                ns: demoNS,
                name: i18next.t(this.props.resourceName, {
                    ns: demoNS
                })
            }))}
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
     * Resource name.
     */
    resourceName: string;

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
            resourceName: "String.numericCharacterSet",
            creator: NUMERIC_CREATOR
        },
        {
            resourceName: "String.hexadecimalCharacterSet",
            creator: HEXADECIMAL_CREATOR
        },
        {
            resourceName: "String.alphabeticCharacterSet",
            creator: ALPHABETIC_CREATOR
        },
        {
            resourceName: "String.alphanumericCharacterSet",
            creator: ALPHANUMERIC_CREATOR
        },
        {
            resourceName: "String.gs1AI82CharacterSet",
            creator: AI82_CREATOR
        },
        {
            resourceName: "String.gs1AI39CharacterSet",
            creator: AI39_CREATOR
        }
    ];

    /**
     * Character set form descriptors. Used to build second-level sub-menu.
     */
    private static readonly CHARACTER_SET_FORM_DESCRIPTORS: readonly CharacterSetFormDescriptor[] = [
        {
            resourceName: "String.validateSubtitle",
            form: CharacterSetValidateForm
        },
        {
            resourceName: "String.createSubtitle",
            form: CharacterSetCreateForm
        },
        {
            resourceName: "String.createSequenceSubtitle",
            form: CharacterSetCreateSequenceForm
        },
        {
            resourceName: "String.valueSubtitle",
            form: CharacterSetValueForm
        }
    ];

    /**
     * @inheritDoc
     */
    override render(): ReactElement {
        return <NavDropdown title={i18next.t("String.stringTitle", {
            ns: demoNS
        })}>
            {
                StringMenu.CHARACTER_SETS_PROPERTIES.map((characterSetDescriptor) => {
                    const characterSetName = i18next.t(characterSetDescriptor.resourceName, {
                        ns: demoNS
                    });

                    return <NavDropdown
                        key={characterSetName}
                        title={characterSetName}>
                        {
                            StringMenu.CHARACTER_SET_FORM_DESCRIPTORS.map((characterSetFormDescriptor) => {
                                const characterSetFormName = i18next.t(characterSetFormDescriptor.resourceName, {
                                    ns: demoNS
                                });

                                return <NavDropdown.Item
                                    key={characterSetFormName}
                                    onClick={() => {
                                        this.setDemoElement(createElement(characterSetFormDescriptor.form, {
                                            key: `${characterSetName}/${characterSetFormName}`,
                                            ...characterSetDescriptor
                                        }));
                                    }}>
                                    {characterSetFormName}
                                </NavDropdown.Item>;
                            })
                        }
                    </NavDropdown>;
                })
            }
        </NavDropdown>;
    }
}
