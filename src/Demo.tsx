import type { FormEvent, ReactElement } from "react";
import { Alert, Button, Card, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { AppComponent } from "./app-context.ts";
import i18next, { demoNS } from "./locale/i18n.js";

/**
 * Demo form state.
 */
interface DemoFormState {
    errorsMap: Map<string, string>;
    result?: string | IterableIterator<string> | undefined;
}

/**
 * Demo form.
 */
export abstract class DemoForm<P = object> extends AppComponent<P, DemoFormState> {
    /**
     * Demo form state.
     */
    override state: DemoFormState = {
        errorsMap: new Map()
    };

    /**
     * Form element.
     */
    private _formElement!: HTMLFormElement;

    /**
     * Get the title.
     */
    protected abstract get title(): string;

    /**
     * Get the subtitle.
     */
    protected abstract get subtitle(): string;

    /**
     * Get the result element name. If provided, result will be added to the application context input values map.
     */
    protected get resultElementName(): string | undefined {
        return undefined;
    }

    /**
     * Get the validity state (true if valid).
     */
    get isValid(): boolean {
        return this.state.errorsMap.size === 0;
    }

    /**
     * Create a text element.
     *
     * @param elementName
     * Element name.
     *
     * @param label
     * Label.
     *
     * @param text
     * Descriptive text.
     *
     * @returns
     * Form group containing label and text input.
     */
    protected textElement(elementName: string, label: string, text: string): ReactElement {
        return <Form.Group className="mb-3" controlId={elementName}>
            <hr />
            <InputGroup className="mb-3">
                {label.length !== 0 ? <InputGroup.Text>{label}</InputGroup.Text> : <></>}
                <Form.Control type="text" defaultValue={this.context.inputValuesMap.get(elementName)} isInvalid={this.state.errorsMap.has(elementName)} />
            </InputGroup>
            <Form.Text muted>{text}</Form.Text>
            <Form.Control.Feedback type="invalid">{this.state.errorsMap.get(elementName)}</Form.Control.Feedback>
        </Form.Group>;
    }

    /**
     * Create an enumeration (radio group) element.
     *
     * @param elementName
     * Element name.
     *
     * @param label
     * Label.
     *
     * @param values
     * Enumeration values.
     *
     * @param names
     * Enumeration value names.
     *
     * @param text
     * Descriptive text.
     *
     * @returns
     * Form group containing either label and radio group input if more than one enumeration value or hidden input if
     * only one enumeration value.
     */
    protected enumElement<T extends number>(elementName: string, label: string, values: readonly T[], names: string[], text: string): ReactElement {
        const defaultValueString = this.context.inputValuesMap.get(elementName);
        const defaultValue = defaultValueString !== undefined ? Number(defaultValueString) as T : values[0];

        return <Form.Group className="mb-3">
            {
                values.length !== 1 ?
                    <>
                        <hr />
                        <Row className="justify-content-center">
                            <Form.Label column={true}>{label}</Form.Label>
                        </Row>
                        {
                            values.map((value) => {
                                const key = `${elementName}-${value}`;

                                return <Form.Check inline key={key} id={key} name={elementName} label={names[value]} type="radio" value={value} defaultChecked={value === defaultValue} />;
                            })
                        }
                        <Row>
                            <Form.Text muted>{text}</Form.Text>
                        </Row>
                    </> :
                    <Form.Control id={elementName} type="hidden" defaultValue={defaultValue} />
            }
        </Form.Group>;
    }

    /**
     * Create a boolean (checkbox) element.
     *
     * @param elementName
     * Element name.
     *
     * @param label
     * Label.
     *
     * @param text
     * Descriptive text.
     *
     * @returns
     * Form group containing label and checkbox.
     */
    protected booleanElement(elementName: string, label: string, text: string): ReactElement {
        const defaultValue = this.context.inputValuesMap.get(elementName) === "true";

        return <Form.Group className="mb-3" controlId={elementName}>
            <hr />
            <Form.Check inline name={elementName} label={label} type="checkbox" defaultChecked={defaultValue} />
            <Row>
                <Form.Text muted>{text}</Form.Text>
            </Row>
            <Form.Control.Feedback type="invalid">{this.state.errorsMap.get(elementName)}</Form.Control.Feedback>
        </Form.Group>;
    }

    /**
     * Render form parameters.
     *
     * @returns
     * Form parameters.
     */
    protected abstract renderParameters(): ReactElement;

    /**
     * Render the demo form.
     *
     * @returns
     * Demo form.
     */
    override render(): ReactElement {
        const errorsMap = this.state.errorsMap;
        const result = this.state.result;

        return <Card>
            <Card.Body>
                <Card.Title>{this.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.subtitle}</Card.Subtitle>
                <Form
                    noValidate
                    onSubmit={(event) => {
                        this.onSubmit(event);
                    }}
                    onReset={(event) => {
                        this.onReset(event);
                    }}
                >
                    {this.renderParameters()}
                    <hr />
                    <Button className="m-3" variant="primary" type="submit">
                        {this.subtitle}
                    </Button>
                    <Button className="m-3" variant="secondary" type="reset">
                        {i18next.t("App.reset", {
                            ns: demoNS
                        })}
                    </Button>
                    <Alert className="mb-3" variant="danger" hidden={!errorsMap.has("")}>
                        {errorsMap.get("")}
                    </Alert>
                    <Alert className="mb-3" variant="success" hidden={result === undefined}>
                        {
                            typeof result === "object" ?
                                <ListGroup>
                                    {
                                        Array.from(result).map((s, index) => <ListGroup.Item key={`s-${index}`} variant="success">
                                            {s}
                                        </ListGroup.Item>)
                                    }
                                </ListGroup> :
                                result
                        }
                    </Alert>
                </Form>
            </Card.Body>
        </Card>;
    }

    /**
     * Get an input element by name.
     *
     * @param elementName
     * Element name.
     *
     * @returns
     * Input element.
     */
    private getInputElement(elementName: string): HTMLInputElement {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- All input elements accessed via this method are of type HTMLInputElement.
        return this._formElement.elements.namedItem(elementName) as HTMLInputElement;
    }

    /**
     * Add an error to the map.
     *
     * @param elementName
     * Element name to which error applies.
     *
     * @param error
     * Error.
     */
    private addError(elementName: string, error: string): void {
        // Only the first error matters.
        if (!this.state.errorsMap.has(elementName)) {
            if (elementName !== "") {
                this.getInputElement(elementName).setCustomValidity(error);
            }

            this.state.errorsMap.set(elementName, error);
        }
    }

    /**
     * Get optional string input from an element.
     *
     * @param elementName
     * Element name.
     *
     * @returns
     * Possibly empty string.
     */
    protected optionalStringInput(elementName: string): string {
        const value = this.getInputElement(elementName).value;

        this.context.inputValuesMap.set(elementName, value);

        return value;
    }

    /**
     * Get required string input from an element; if string is empty, adds an error to the errors map.
     *
     * @param elementName
     * Element name.
     *
     * @returns
     * Possibly empty string.
     */
    protected requiredStringInput(elementName: string): string {
        const value = this.optionalStringInput(elementName).trim();

        if (value === "") {
            this.addError(elementName, i18next.t("Demo.valueIsRequired", {
                ns: demoNS
            }));
        }

        return value;
    }

    /**
     * Get optional number input from an element.
     *
     * @param elementName
     * Element name.
     *
     * @returns
     * Number or undefined.
     */
    protected optionalNumberInput(elementName: string): number | undefined {
        const stringValue = this.optionalStringInput(elementName);

        let numberValue: number | undefined;

        if (stringValue !== "") {
            numberValue = parseInt(stringValue);

            if (Number.isNaN(numberValue)) {
                this.addError(elementName, i18next.t("Demo.valueIsNotANumber", {
                    ns: demoNS
                }));
            }
        }

        return numberValue;
    }

    /**
     * Get required number input from an element; if number is undefined, adds an error to the errors map and returns 0.
     *
     * @param elementName
     * Element name.
     *
     * @returns
     * Number.
     */
    protected requiredNumberInput(elementName: string): number {
        let numberValue = this.optionalNumberInput(elementName);

        if (numberValue === undefined) {
            this.addError(elementName, i18next.t("Demo.valueIsRequired", {
                ns: demoNS
            }));

            numberValue = 0;
        }

        return numberValue;
    }

    /**
     * Get enumeration input from an element.
     *
     * @param elementName
     * Element name.
     *
     * @returns
     * Enumeration value.
     */
    protected enumInput<T extends number>(elementName: string): T {
        return this.requiredNumberInput(elementName) as T;
    }

    /**
     * Get boolean input from an element.
     *
     * @param elementName
     * Element name.
     *
     * @returns
     * Boolean value.
     */
    protected booleanInput(elementName: string): boolean {
        const value = this.getInputElement(elementName).checked;

        this.context.inputValuesMap.set(elementName, String(value));

        return value;
    }

    /**
     * Display a confirmation message if the number of strings to be created is greater than 1,000.
     *
     * @param count
     * Number of strings to be created.
     *
     * @returns
     * True if strings should be created.
     */
    protected confirmCreateStrings(count: number): boolean {
        return count <= 1000 || confirm(i18next.t("Demo.confirmCreateStrings", {
            ns: demoNS,
            count
        }));
    }

    /**
     * Process the form.
     *
     * @returns
     * Processing result.
     */
    protected abstract processForm(): string | IterableIterator<string> | undefined;

    /**
     * Handle submit event.
     *
     * @param event
     * Event.
     */
    private onSubmit(event: FormEvent<HTMLFormElement>): void {
        // Default behaviour clears the form.
        event.preventDefault();

        this._formElement = event.currentTarget;

        this.state.errorsMap.clear();

        let result: string | IterableIterator<string> | undefined;

        try {
            result = this.processForm();
        } catch (e) {
            if (e instanceof Error) {
                this.addError("", e.message);

                if (e.name !== "RangeError") {
                    console.error(e);
                }
            } else {
                // Can't localize this as source of error may be localization itself.
                this.addError("", `Unknown error: ${String(e)}`);
                console.error(e);
            }
        }

        // String result is added back as an input value if result element name is defined.
        if (this.resultElementName !== undefined && typeof result === "string") {
            this.context.inputValuesMap.set(this.resultElementName, result);
        }

        this.setState(state => ({
            ...state,
            result
        }));
    }

    /**
     * Handle reset event.
     *
     * @param event
     * Event.
     */
    private onReset(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        this.state.errorsMap.clear();

        this.setState(state => ({
            ...state,
            result: undefined
        }));
    }
}
