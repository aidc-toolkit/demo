import { i18nextDemo } from "./locale/i18n.ts";

/**
 * Map a primitive type and boolean is required to input value type.
 */
export type InputValue<T extends string | number | boolean, IsRequired extends boolean> = IsRequired extends true ? T : T | undefined;

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
export class InputManager<T extends string | number | boolean, IsRequired extends boolean> implements FormInputHook {
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

        // TODO Refactor type when https://github.com/microsoft/TypeScript/pull/56941 released.
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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type determination is handled above.
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
                this._error = i18nextDemo.t("Demo.valueIsRequired");
            }
        } else {
            // Search for non-digit character if type is number.
            if (this.type === "number" && /\D/.test(this._stringValue)) {
                this._error = i18nextDemo.t("Demo.valueIsNotANumber");
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
export class FormManager {
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
        let result: ProcessResult = undefined;

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
