import type { PropertyKeys } from "@aidc-toolkit/core";
import { InputState, type InputValue } from "./input-state.js";
import { i18nextDemo } from "./locale/i18n.js";
import type { Primitive, TypeString } from "./type.js";

/**
 * Supported process result types.
 */
export type ProcessResult = string | Iterable<string> | undefined;

/**
 * Form manager.
 */
export class FormManager<TFormData extends object> {
    /**
     * Input values map from application context.
     */
    readonly #appInputValuesMap: Map<string | number | symbol, string>;

    /**
     * Result name. If defined, result is stored as input to another form.
     */
    readonly #resultName: string | undefined;

    /**
     * Callback to process the form.
     *
     * @returns
     * String or strings if valid or undefined if not.
     */
    readonly #onProcess: (formData: TFormData) => ProcessResult;

    /**
     * Input states for current form.
     */
    readonly #inputStatesMap = new Map<keyof TFormData, InputState<TFormData, TypeString, Primitive<TypeString>, boolean>>();

    /**
     * Constructor.
     *
     * @param appInputValuesMap
     * Input values map from application context.
     *
     * @param resultName
     * Result name.
     *
     * @param onProcess
     * Callback to process the form.
     */
    constructor(appInputValuesMap: Map<string, string>, resultName: string | undefined, onProcess: (formData: TFormData) => ProcessResult) {
        this.#appInputValuesMap = appInputValuesMap;
        this.#resultName = resultName;
        this.#onProcess = onProcess;
    }

    /**
     * Save an input state.
     *
     * @param inputState
     * Input state.
     */
    #saveInputState<TTypeString extends TypeString, TPrimitive extends Primitive<TTypeString>, IsRequired extends boolean>(inputState: InputState<TFormData, TTypeString, TPrimitive, IsRequired>): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type must match.
        this.#inputStatesMap.set(inputState.name, inputState as unknown as InputState<TFormData, TypeString, Primitive<TypeString>, boolean>);
    }

    /**
     * Get the state for an input, creating it if necessary.
     *
     * @param name
     * Element name.
     *
     * @param type
     * Input type.
     *
     * @param isRequired
     * True if input is required.
     *
     * @param defaultValue
     * Default value.
     *
     * @returns
     * Input state.
     */
    getInputState<TTypeString extends TypeString, TPrimitive extends Primitive<TTypeString>, IsRequired extends boolean>(name: PropertyKeys<TFormData, TPrimitive>, type: TTypeString, isRequired: IsRequired, defaultValue: InputValue<TPrimitive, false>): InputState<TFormData, TTypeString, TPrimitive, IsRequired> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type must match.
        let inputState = this.#inputStatesMap.get(name) as InputState<TFormData, TTypeString, TPrimitive, IsRequired> | undefined;

        if (inputState === undefined) {
            inputState = new InputState(name, type, isRequired, defaultValue !== undefined ? String(defaultValue) : "", this.#appInputValuesMap.get(name), undefined);

            this.#saveInputState(inputState);
        }

        return inputState;
    }

    /**
     * Update an input state.
     *
     * @param inputState
     * Input state.
     *
     * @param stringValue
     * String value.
     *
     * @param errorMessage
     * Error message.
     */
    #updateInputState<TTypeString extends TypeString, TPrimitive extends Primitive<TTypeString>, IsRequired extends boolean>(inputState: InputState<TFormData, TTypeString, TPrimitive, IsRequired>, stringValue: string | undefined, errorMessage: string | undefined): void {
        const updatedInputState = new InputState(inputState.name, inputState.type, inputState.isRequired, inputState.defaultStringValue, stringValue, errorMessage);

        updatedInputState.saveSetState(inputState.setState);

        this.#saveInputState(updatedInputState);

        inputState.setState(updatedInputState);
    }

    /**
     * Save an input value.
     *
     * @param inputState
     * Input state.
     *
     * @param value
     * Value.
     */
    saveInputValue<TTypeString extends TypeString, TPrimitive extends Primitive<TTypeString>, IsRequired extends boolean>(inputState: InputState<TFormData, TTypeString, TPrimitive, IsRequired>, value: InputValue<TPrimitive, false>): void {
        this.#updateInputState(inputState, value !== undefined ? String(value) : undefined, inputState.errorMessage);
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

        const formData: Partial<TFormData> = {};

        for (const [name, inputState] of this.#inputStatesMap.entries()) {
            const stringValue = inputState.stringValue.trim();

            let errorMessage: string | undefined = undefined;

            if (stringValue !== "") {
                // Search for non-digit character if type is number.
                if (inputState.type === "number" && /\D/u.test(stringValue)) {
                    errorMessage = i18nextDemo.t("Demo.valueIsNotANumber");
                }
            } else if (inputState.isRequired) {
                errorMessage = i18nextDemo.t("Demo.valueIsRequired");
            }

            if (errorMessage === undefined) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type must match.
                formData[name] = inputState.valueOf(stringValue) as TFormData[keyof TFormData] | undefined;

                // Application context input values are stored as strings.
                this.#appInputValuesMap.set(name, stringValue);
            } else {
                isValid = false;
            }

            if (inputState.stringValue !== stringValue || inputState.errorMessage !== errorMessage) {
                this.#updateInputState(inputState, stringValue, errorMessage);
            }
        }

        if (isValid) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Form is expected to be complete.
            result = this.#onProcess(formData as TFormData);

            if (this.#resultName !== undefined) {
                // Application context input values support only strings.
                if (typeof result === "string") {
                    this.#appInputValuesMap.set(this.#resultName, result);
                } else {
                    this.#appInputValuesMap.delete(this.#resultName);
                }
            }
        }

        return result;
    }

    /**
     * Reset the form.
     */
    reset(): void {
        for (const inputState of this.#inputStatesMap.values()) {
            this.#updateInputState(inputState, undefined, undefined);
        }
    }
}
