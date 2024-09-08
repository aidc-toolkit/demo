import type { FormEvent, ReactElement } from "react";
import { Alert, Button, Card, Form, ListGroup, Row } from "react-bootstrap";

import { AppComponent } from "./app_context.ts";

interface DemoState {
    errorsMap: Map<string, string>;
    result?: string | IterableIterator<string> | undefined;
}

export abstract class DemoForm<P = object> extends AppComponent<P, DemoState> {
    override state: DemoState = {
        errorsMap: new Map()
    };

    private _formElement?: HTMLFormElement;

    protected abstract get title(): string;

    protected abstract get subtitle(): string;

    protected get resultElementName(): string | undefined {
        return undefined;
    }

    get isValid(): boolean {
        return this.state.errorsMap.size === 0;
    }

    protected textElement(elementName: string, label: string, text: string): ReactElement {
        return <Form.Group className="mb-3" controlId={elementName}>
            <Form.Label column="lg" sm={2}>{label}</Form.Label>
            <Form.Control type="text" defaultValue={this.context.inputValues.get(elementName)} isInvalid={this.state.errorsMap.has(elementName)} />
            <Form.Text muted>{text}</Form.Text>
            <Form.Control.Feedback type="invalid">{this.state.errorsMap.get(elementName)}</Form.Control.Feedback>
        </Form.Group>;
    }

    protected enumElement<T extends number>(elementName: string, label: string, values: readonly T[], names: string[], text: string): ReactElement {
        const defaultValueString = this.context.inputValues.get(elementName);
        const defaultValue = defaultValueString !== undefined ? Number(defaultValueString) as T : values[0];

        return <Form.Group className="mb-3">
            {
                values.length === 1 ?
                    <Form.Control id={elementName} type="hidden" defaultValue={defaultValue} /> :
                    <>
                        <Row className="justify-content-center">
                            <Form.Label column="lg" sm={2}>{label}</Form.Label>
                        </Row>
                        {
                            values.map((value) => {
                                const key = `${elementName}-${value}`;

                                return <Form.Check inline key={key} id={key} name={elementName} label={names[value]} type="radio" value={value} defaultChecked={value === defaultValue} />;
                            })
                        }
                        <Row>
                            <Form.Text muted>{ text }</Form.Text>
                        </Row>
                    </>
            }
        </Form.Group>;
    }

    protected booleanElement(elementName: string, label: string, text: string): ReactElement {
        const defaultValue = this.context.inputValues.get(elementName) === "true";

        return <Form.Group className="mb-3" controlId={elementName}>
            <Form.Check inline name={elementName} label={label} type="checkbox" defaultChecked={defaultValue} />
            <Row>
                <Form.Text muted>{ text }</Form.Text>
            </Row>
            <Form.Control.Feedback type="invalid">{this.state.errorsMap.get(elementName)}</Form.Control.Feedback>
        </Form.Group>;
    }

    protected abstract renderParameters(): ReactElement;

    override render(): ReactElement {
        const errorsMap = this.state.errorsMap;
        const result = this.state.result;

        return <Card>
            <Card.Body>
                <Card.Title>{ this.title }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ this.subtitle }</Card.Subtitle>
                <Form noValidate onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                    {this.renderParameters()}
                    <Button className="m-3" variant="primary" type="submit">
                        { this.subtitle }
                    </Button>
                    <Button className="m-3" variant="secondary" type="reset">
                        Reset
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

    private getInputElement(elementName: string): HTMLInputElement {
        // Form element must be defined for this method to be called.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._formElement!.elements.namedItem(elementName) as HTMLInputElement;
    }

    private addError(elementName: string, error: string): void {
        // Only the first error matters.
        if (!this.state.errorsMap.has(elementName)) {
            if (elementName !== "") {
                this.getInputElement(elementName).setCustomValidity(error);
            }

            this.state.errorsMap.set(elementName, error);
        }
    }

    protected optionalStringInput(elementName: string): string {
        const value = this.getInputElement(elementName).value;

        this.context.inputValues.set(elementName, value);

        return value;
    }

    protected requiredStringInput(elementName: string): string {
        const value = this.optionalStringInput(elementName).trim();

        if (value === "") {
            this.addError(elementName, "Value is required.");
        }

        return value;
    }

    protected optionalNumberInput(elementName: string): number | undefined {
        const stringValue = this.optionalStringInput(elementName);

        let numberValue: number | undefined;

        if (stringValue !== "") {
            numberValue = parseInt(stringValue);

            if (Number.isNaN(numberValue)) {
                this.addError(elementName, "Value is not a number.");
            }
        }

        return numberValue;
    }

    protected requiredNumberInput(elementName: string): number {
        let numberValue = this.optionalNumberInput(elementName);

        if (numberValue === undefined) {
            this.addError(elementName, "Value is required.");

            numberValue = 0;
        }

        return numberValue;
    }

    protected enumInput<T extends number>(elementName: string): T {
        return this.requiredNumberInput(elementName) as T;
    }

    protected booleanInput(elementName: string): boolean {
        const value = this.getInputElement(elementName).checked;

        this.context.inputValues.set(elementName, String(value));

        return value;
    }

    protected confirmCreateStrings(count: number): boolean {
        return count <= 1000 || confirm(`This will create ${count.toLocaleString()} identification keys.\nAre you sure?`);
    }

    protected abstract processForm(): string | IterableIterator<string> | undefined;

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
            } else {
                this.addError("", `Unknown error: ${String(e)}`);
            }
        }

        if (this.resultElementName !== undefined && typeof result === "string") {
            this.context.inputValues.set(this.resultElementName, result);
        }

        this.setState(state => ({
            ...state,
            result
        }));
    }

    private onReset(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        this.state.errorsMap.clear();

        this.setState(state => ({
            ...state,
            result: undefined
        }));
    }
}
