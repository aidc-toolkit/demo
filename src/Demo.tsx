import {
    createContext,
    type FormEvent,
    type ReactElement,
    type ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import { Alert, Button, Card, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { transformIterable } from "../../utility";
import { App } from "./App.tsx";
import i18next, { demoNS } from "./locale/i18n.js";

// TODO Review when https://github.com/microsoft/TypeScript/pull/56941 released.
// Problem is in usage inside a function, e.g.,
// function f<T extends number>(): void {
//     const x: PrimitiveStringType<T> = "number";
// }
// /**
//  * Map a primitive type to a string.
//  */
// type PrimitiveString<T extends string | number | boolean> =
//     [T] extends [string] ? [string] extends [T] ? "string" : never :
//         [T] extends [number] ? [number] extends [T] ? "number" : never :
//             [T] extends [boolean] ? [boolean] extends [T] ? "boolean" : never :
//                 never;

/**
 * Map a string to its equivalent primitive type.
 */
type Primitive<T extends "string" | "number" | "boolean"> =
    [T] extends ["string"] ? string : [T] extends ["number"] ? number : [T] extends ["boolean"] ? boolean : never;

/**
 * Map a primitive type and boolean is required to input value type.
 */
type InputValue<T extends string | number | boolean, IsRequired extends boolean> =
    IsRequired extends true ? T : T | undefined;

/**
 * Form-level hook to input manager. Defines input manager properties and methods used by form manager.
 */
interface FormInputHook {
    /**
     * String value.
     */
    stringValue: string;

    /**
     * Error.
     */
    error: string | undefined;

    /**
     * Validate the input.
     */
    validate: () => void;

    /**
     * Reset the input.
     */
    reset: () => void;
}

/**
 * Input manager. Used to maintain form-level data for an input element.
 */
class InputManager<T extends string | number | boolean, IsRequired extends boolean> implements FormInputHook {
    /**
     * Input type.
     */
    private readonly _type: "string" | "number" | "boolean";

    /**
     * True if input is required.
     */
    private readonly _isRequired: IsRequired;

    /**
     * Default string value.
     */
    private readonly _defaultStringValue: string;

    /**
     * Callback to set the value when enclosing form is processed.
     */
    private readonly _onProcess: (inputValue: InputValue<T, IsRequired>) => void;

    /**
     * Callback when value is reset.
     */
    private readonly _onReset: () => void;

    /**
     * Callback to set the error for the input.
     */
    private readonly _onError: ((error: string | undefined) => void) | undefined;

    /**
     * String value.
     */
    private _stringValue: string;

    /**
     * Error.
     */
    private _error: string | undefined;

    /**
     * Constructor.
     *
     * @param type
     * Input type.
     *
     * @param isRequired
     * True if input is required.
     *
     * @param defaultStringValue
     * Default string value.
     *
     * @param onProcess
     * Callback to set the value when enclosing form is processed.
     *
     * @param onReset
     * Callback when value is reset.
     *
     * @param onError
     * Callback to set the error for the input.
     *
     * @param stringInitialValue
     * String initial value.
     */
    constructor(type: "string" | "number" | "boolean", isRequired: IsRequired, defaultStringValue: string, onProcess: (inputValue: InputValue<T, IsRequired>) => void, onReset: () => void, onError: ((error: (string | undefined)) => void) | undefined, stringInitialValue: string | undefined) {
        this._type = type;
        this._isRequired = isRequired;
        this._defaultStringValue = defaultStringValue;
        this._onProcess = onProcess;
        this._onReset = onReset;
        this._onError = onError;
        this._stringValue = stringInitialValue !== undefined && stringInitialValue !== "" ? stringInitialValue : defaultStringValue;
    }

    /**
     * Get the input type.
     */
    get type(): "string" | "number" | "boolean" {
        return this._type;
    }

    /**
     * Determine if input is required.
     */
    get isRequired(): boolean {
        return this._isRequired;
    }

    /**
     * Get the string value.
     */
    get stringValue(): string {
        return this._stringValue;
    }

    /**
     * Set the string value.
     */
    set stringValue(value: string) {
        this._stringValue = value;
    }

    /**
     * Get the error.
     */
    get error(): string | undefined {
        return this._error;
    }

    /**
     * Get the value.
     */
    get value(): InputValue<T, IsRequired> {
        if ((this.isRequired && this.stringValue === "") || this.error !== undefined) {
            throw new Error("Attempted to retrieve value for input in initial or error state");
        }

        let value: string | number | boolean | undefined;

        if (this._stringValue === "") {
            value = undefined;
        } else {
            switch (this.type) {
                case "string":
                    value = this._stringValue;
                    break;

                case "number":
                    value = parseInt(this._stringValue);
                    break;

                case "boolean":
                    value = this._stringValue === String(true);
                    break;
            }
        }

        return value as InputValue<T, IsRequired>;
    }

    /**
     * Set the value.
     */
    set value(value: InputValue<T, IsRequired>) {
        this._stringValue = value === undefined ? "" : value.toString();
    }

    /**
     * Validate the input.
     */
    validate(): void {
        // Clear any prior error.
        this._error = undefined;

        // Trim the string value.
        this._stringValue = this._stringValue.trim();

        if (this._stringValue === "") {
            if (this.isRequired) {
                this._error = i18next.t("Demo.valueIsRequired", {
                    ns: demoNS
                });
            }
        } else {
            // Search for non-digit character if type is number.
            if (this.type === "number" && /\D/.test(this._stringValue)) {
                this._error = i18next.t("Demo.valueIsNotANumber", {
                    ns: demoNS
                });
            }
        }

        if (this._error === undefined) {
            this._onProcess(this.value);
        }

        // Call _onError if defined to set or clear the error at the input level.
        if (this._onError !== undefined) {
            this._onError(this._error);
        }
    }

    /**
     * Reset the input.
     */
    reset(): void {
        this._stringValue = this._defaultStringValue;
        this._error = undefined;

        this._onReset();

        if (this._onError !== undefined) {
            this._onError(undefined);
        }
    }
}

/**
 * Supported process result types.
 */
export type ProcessResult = string | Iterable<string> | undefined;

/**
 * Form manager.
 */
class FormManager {
    /**
     * Input values map from application context.
     */
    private readonly _appInputValuesMap: Map<string, string>;

    /**
     * Callback to process the form.
     *
     * @returns
     * String or strings if valid or undefined if not.
     */
    private readonly _onProcess: () => ProcessResult;

    /**
     * Result name (optional). If defined, result is stored as input to another form.
     */
    private readonly _resultName: string | undefined;

    /**
     * Input hooks for current form.
     */
    private readonly _formInputHooksMap: Map<string, FormInputHook>;

    /**
     * Constructor.
     *
     * @param appInputValuesMap
     * Input values map from application context.
     *
     * @param onProcess
     * Callback to process the form.
     *
     * @param resultName
     * Result name (optional).
     */
    constructor(appInputValuesMap: Map<string, string>, onProcess: () => ProcessResult, resultName: string | undefined) {
        this._appInputValuesMap = appInputValuesMap;
        this._onProcess = onProcess;
        this._resultName = resultName;
        this._formInputHooksMap = new Map();
    }

    /**
     * Add an input manager.
     *
     * @param name
     * Input element name.
     *
     * @param type
     * Input type.
     *
     * @param isRequired
     * True if input is required.
     *
     * @param defaultStringValue
     * Default string value.
     *
     * @param onProcess
     * Callback to set the value when enclosing form is processed.
     *
     * @param onReset
     * Callback when value is reset.
     *
     * @param onError
     * Callback to set the error for the input.
     *
     * @returns
     * Input manager.
     */
    addInputManager<T extends string | number | boolean, IsRequired extends boolean>(name: string, type: "string" | "number" | "boolean", isRequired: IsRequired, defaultStringValue: string, onProcess: (inputValue: InputValue<T, IsRequired>) => void, onReset: () => void, onError: ((error: string | undefined) => void) | undefined = undefined): InputManager<T, IsRequired> {
        if (this._formInputHooksMap.has(name)) {
            throw new Error(`Duplicate input manager for input "${name}"`);
        }

        const inputManager = new InputManager(type, isRequired, defaultStringValue, onProcess, onReset, onError, this._appInputValuesMap.get(name));

        this._formInputHooksMap.set(name, inputManager);

        return inputManager;
    }

    /**
     * Remove an input manager.
     *
     * @param name
     * Input element name.
     */
    removeInputManager(name: string): void {
        this._formInputHooksMap.delete(name);
    }

    /**
     * Process the form.
     *
     * @returns
     * Result.
     */
    process(): ProcessResult {
        let result: ProcessResult;

        let isValid = true;

        for (const [name, formInputManager] of this._formInputHooksMap.entries()) {
            formInputManager.validate();

            if (formInputManager.error === undefined) {
                // Application context input values are stored as strings.
                this._appInputValuesMap.set(name, formInputManager.stringValue);
            } else {
                isValid = false;
            }
        }

        if (isValid) {
            result = this._onProcess();

            if (this._resultName !== undefined) {
                // Application context input values support only strings.
                if (typeof result === "string") {
                    this._appInputValuesMap.set(this._resultName, result);
                } else {
                    this._appInputValuesMap.delete(this._resultName);
                }
            }
        }

        return result;
    }

    /**
     * Reset the form.
     */
    reset(): void {
        for (const formInputManager of this._formInputHooksMap.values()) {
            formInputManager.reset();
        }
    }
}

/**
 * Context.
 */
const Context = createContext(new FormManager(new Map(), () => undefined, undefined));

/**
 * Input properties. All inputs require at least these properties to be set by the form.
 */
export interface InputProperties<T extends string | number | boolean | undefined> {
    /**
     * Callback to set the value when enclosing form is processed.
     */
    readonly onProcess: (inputValue: T) => void;
}

/**
 * Hint input properties. Many inputs use common labels and custom hints.
 */
export interface HintInputProperties<T extends string | number | boolean | undefined> extends InputProperties<T> {
    /**
     * Hint to user.
     */
    readonly hint: string;
}

/**
 * Base input properties.
 */
interface BaseInputProperties<IsLabelRequired extends boolean, T extends string | number | boolean | undefined> extends HintInputProperties<T> {
    /**
     * Element name.
     */
    readonly name: string;

    /**
     * Label, possibly optional; if undefined, no label is added.
     */
    readonly label: IsLabelRequired extends true ? string : string | undefined;
}

/**
 * Text input properties. Primitive type is declared via the type string.
 */
interface TextInputProperties<T extends "string" | "number", IsRequired extends boolean> extends BaseInputProperties<false, InputValue<Primitive<T>, IsRequired>> {
    /**
     * Input type.
     */
    readonly type: T;

    /**
     * True if required.
     */
    readonly isRequired: IsRequired;
}

/**
 * Text input. Renders an optional label and text control.
 *
 * @param properties
 * Properties
 *
 * @returns
 * React element.
 */
export function TextInput<T extends "string" | "number", IsRequired extends boolean>(properties: TextInputProperties<T, IsRequired>): ReactElement {
    const formManager = useContext(Context);
    const [inputManager, setInputManager] = useState<InputManager<Primitive<T>, IsRequired>>();
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        /**
         * Handle value being reset.
         */
        function reset(): void {
            setValue("");
        }

        const inputManager = formManager.addInputManager(properties.name, properties.type, properties.isRequired, "", properties.onProcess, reset, setError);

        setInputManager(inputManager);

        // Update value from input manager.
        setValue(inputManager.stringValue);

        return () => {
            formManager.removeInputManager(properties.name);
        };
    }, [formManager, properties.name, properties.type, properties.isRequired, properties.onProcess]);

    return <Form.Group className="mb-3" controlId={properties.name}>
        <hr />
        <InputGroup className="mb-3">
            {properties.label !== undefined ?
                <InputGroup.Text>{properties.label}</InputGroup.Text> :
                <></>}
            <Form.Control
                type="text"
                value={value}
                isInvalid={error !== undefined}
                onChange={(event) => {
                    if (inputManager !== undefined) {
                        inputManager.stringValue = event.target.value;
                        setValue(event.target.value);
                    }
                }}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </InputGroup>
        <Form.Text muted>{properties.hint}</Form.Text>
    </Form.Group>;
}

/**
 * Enumeration input properties.
 */
interface EnumInputProperties<T extends number> extends BaseInputProperties<true, T> {
    /**
     * Enum values.
     */
    readonly values: readonly T[];

    /**
     * Enum names, aligned with values.
     */
    readonly names: string[];
}

/**
 * Enumeration input. Renders radio group controls if multiple or a hidden control if single.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function EnumInput<T extends number>(properties: EnumInputProperties<T>): ReactElement {
    const defaultValue = properties.values[0];

    const formManager = useContext(Context);
    const [inputManager, setInputManager] = useState<InputManager<T, true>>();
    const [checkedValue, setCheckedValue] = useState(defaultValue);

    useEffect(() => {
        /**
         * Handle value being reset.
         */
        function reset(): void {
            setCheckedValue(defaultValue);
        }

        const inputManager = formManager.addInputManager(properties.name, "number", true, defaultValue.toString(), properties.onProcess, reset);

        setInputManager(inputManager);

        let checkedValue = inputManager.value;

        // Value must be within range of acceptable values.
        if (!properties.values.includes(checkedValue)) {
            checkedValue = defaultValue;
            inputManager.value = defaultValue;
        }

        // Update checked value from input manager.
        setCheckedValue(checkedValue);

        return () => {
            formManager.removeInputManager(properties.name);
        };
    }, [formManager, properties.name, properties.values, properties.onProcess, defaultValue]);

    return <Form.Group className="mb-3">
        {properties.values.length !== 1 ?
            <>
                <hr />
                <Row className="justify-content-center">
                    <Form.Label column={true}>{properties.label}</Form.Label>
                </Row>
                {properties.values.map((value) => {
                    const key = `${properties.name}-${value}`;

                    return <Form.Check
                        inline
                        key={key}
                        id={key}
                        name={properties.name}
                        label={properties.names[value]}
                        type="radio"
                        value={value}
                        checked={value === checkedValue}
                        onChange={(event) => {
                            if (inputManager !== undefined) {
                                inputManager.stringValue = event.target.value;
                                setCheckedValue(inputManager.value);
                            }
                        }}
                    />;
                })}
                <Row>
                    <Form.Text muted>{properties.hint}</Form.Text>
                </Row>
            </> :
            <Form.Control id={properties.name} type="hidden" value={checkedValue} />}
    </Form.Group>;
}

/**
 * Boolean properties.
 */
interface BooleanInputProperties extends BaseInputProperties<true, boolean> {
}

/**
 * Boolean input. Renders a checkbox input.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BooleanInput(properties: BooleanInputProperties): ReactElement {
    const formManager = useContext(Context);
    const [inputManager, setInputManager] = useState<InputManager<boolean, true>>();
    const [value, setValue] = useState(false);

    useEffect(() => {
        /**
         * Handle value being reset.
         */
        function reset(): void {
            setValue(false);
        }

        const inputManager = formManager.addInputManager(properties.name, "boolean", true, String(false), properties.onProcess, reset);

        setInputManager(inputManager);

        // Update value from input manager.
        setValue(inputManager.value);

        return () => {
            formManager.removeInputManager(properties.name);
        };
    }, [formManager, properties.name, properties.onProcess]);

    return <Form.Group className="mb-3" controlId={properties.name}>
        <hr />
        <Form.Check
            inline
            name={properties.name}
            label={properties.label}
            type="checkbox"
            checked={value}
            onChange={(event) => {
                if (inputManager !== undefined) {
                    inputManager.value = event.target.checked;
                    setValue(event.target.checked);
                }
            }}
        />
        <Row>
            <Form.Text muted>{properties.hint}</Form.Text>
        </Row>
    </Form.Group>;
}

/**
 * Form properties. All forms require at least these properties to be set.
 */
export interface FormProperties {
    /**
     * Form subtitle resource name.
     */
    readonly subtitleResourceName: string;

    /**
     * Callback to process the form.
     *
     * @returns
     * String or strings if valid or undefined if not.
     */
    readonly onProcess: () => ProcessResult;

    /**
     * Result name (optional). If defined, result is stored as input for another form.
     */
    readonly resultName?: string | undefined;

    /**
     * Children.
     */
    readonly children?: ReactNode | undefined;
}

/**
 * Base form properties.
 */
interface BaseFormProperties extends FormProperties {
    /**
     * Title.
     */
    readonly title: string;
}

/**
 * Form state.
 */
interface FormState {
    /**
     * Form manager.
     */
    formManager: FormManager;

    /**
     * Result.
     */
    result: ProcessResult;

    /**
     * Error.
     */
    error: string | undefined;
}

/**
 * Base form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BaseForm(properties: BaseFormProperties): ReactElement {
    const appContext = useContext(App.Context);

    const [state, setState] = useState<FormState>({
        formManager: new FormManager(appContext.inputValuesMap, properties.onProcess, properties.resultName),
        result: undefined,
        error: undefined
    });

    /**
     * Handle submit event.
     *
     * @param event
     * Event.
     */
    function onSubmit(event: FormEvent<HTMLFormElement>): void {
        // Default behaviour clears the form.
        event.preventDefault();

        let result: ProcessResult;
        let error: string | undefined;

        try {
            result = state.formManager.process();
        } catch (e) {
            if (e instanceof Error) {
                error = e.message;

                if (e.name !== "RangeError") {
                    console.error(e);
                }
            } else {
                // Can't localize this as source of error may be localization itself.
                error = `Unknown error: ${String(e)}`;
                console.error(e);
            }
        }

        // String result is added back as an input value if result name is defined.
        if (properties.resultName !== undefined && typeof result === "string") {
            appContext.inputValuesMap.set(properties.resultName, result);
        }

        setState(state => ({
            ...state,
            result,
            error
        }));
    }

    /**
     * Handle reset event.
     *
     * @param event
     * Event.
     */
    function onReset(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        state.formManager.reset();

        setState(state => ({
            ...state,
            result: undefined,
            error: undefined
        }));
    }

    const subtitle = i18next.t(properties.subtitleResourceName, {
        ns: demoNS
    });

    return <Context.Provider value={state.formManager}>
        <Card>
            <Card.Body>
                <Card.Title>{properties.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
                <Form
                    noValidate
                    onSubmit={onSubmit}
                    onReset={onReset}
                >
                    {properties.children}
                    <hr />
                    <Button className="m-3" variant="primary" type="submit">
                        {subtitle}
                    </Button>
                    <Button className="m-3" variant="secondary" type="reset">
                        {i18next.t("App.reset", {
                            ns: demoNS
                        })}
                    </Button>
                    <Alert className="mb-3" variant="danger" hidden={state.error === undefined}>
                        {state.error}
                    </Alert>
                    <Alert className="mb-3" variant="success" hidden={state.result === undefined}>
                        {
                            typeof state.result === "object" ?
                                <ListGroup>
                                    {
                                        transformIterable(state.result, (input, index) => <ListGroup.Item key={`result-${index}`} variant="success">
                                            {input}
                                        </ListGroup.Item>)
                                    }
                                </ListGroup> :
                                state.result
                        }
                    </Alert>
                </Form>
            </Card.Body>
        </Card>
    </Context.Provider>;
}
