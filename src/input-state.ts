import type { PropertyKeys } from "@aidc-toolkit/core";
import type { Dispatch, SetStateAction } from "react";
import type { Primitive, TypeString } from "./type.js";

/**
 * Map a primitive type and boolean is required to input value type.
 */
export type InputValue<T extends string | number | boolean, IsRequired extends boolean> = IsRequired extends true ? T : T | undefined;

/**
 * Input state. Used to maintain form-level data for an input element.
 */
export class InputState<TFormData extends object, TTypeString extends TypeString, TPrimitive extends Primitive<TTypeString>, IsRequired extends boolean> {
    /**
     * Element name.
     */
    readonly #name: PropertyKeys<TFormData, TPrimitive>;

    /**
     * Input type.
     */
    readonly #type: TTypeString;

    /**
     * True if input is required.
     */
    readonly #isRequired: IsRequired;

    /**
     * Default string value.
     */
    readonly #defaultStringValue: string;

    /**
     * String value.
     */
    readonly #stringValue: string;

    /**
     * Error message.
     */
    readonly #errorMessage: string | undefined;

    /**
     * React set state callback.
     */
    #setState!: Dispatch<SetStateAction<InputState<TFormData, TTypeString, TPrimitive, IsRequired>>>;

    /**
     * Constructor.
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
     * @param defaultStringValue
     * Default string value.
     *
     * @param stringValue
     * String value.
     *
     * @param errorMessage
     * Error message.
     */
    constructor(name: PropertyKeys<TFormData, TPrimitive>, type: TTypeString, isRequired: IsRequired, defaultStringValue: string, stringValue: string | undefined, errorMessage: string | undefined) {
        this.#name = name;
        this.#type = type;
        this.#isRequired = isRequired;
        this.#defaultStringValue = defaultStringValue;
        this.#stringValue = stringValue !== undefined && stringValue !== "" ? stringValue : defaultStringValue;
        this.#errorMessage = errorMessage;
    }

    /**
     * Save this input state's set state callback.
     *
     * @param setState
     * React set state callback.
     */
    saveSetState(setState: Dispatch<SetStateAction<InputState<TFormData, TTypeString, TPrimitive, IsRequired>>>): void {
        this.#setState = setState;
    }

    /**
     * Get the value of a string value.
     *
     * @param stringValue
     * String value.
     *
     * @returns
     * Value.
     */
    valueOf(stringValue: string): InputValue<TPrimitive, false> {
        let value: string | number | boolean | undefined;

        if (stringValue === "") {
            // Empty string value is returned as is.
            value = this.type === "string" ? "" : undefined;
        } else {
            switch (this.type) {
                case "string":
                    value = stringValue;
                    break;

                case "number":
                    value = parseInt(stringValue, 10);
                    break;

                case "boolean":
                    value = stringValue === String(true);
                    break;
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type determination is handled above.
        return value as InputValue<TPrimitive, false>;
    }

    /**
     * Get the element name.
     */
    get name(): PropertyKeys<TFormData, TPrimitive> {
        return this.#name;
    }

    /**
     * Get the input type.
     */
    get type(): TTypeString {
        return this.#type;
    }

    /**
     * Determine if input is required.
     */
    get isRequired(): IsRequired {
        return this.#isRequired;
    }

    /**
     * Get the default string value.
     */
    get defaultStringValue(): string {
        return this.#defaultStringValue;
    }

    /**
     * Get the string value.
     */
    get stringValue(): string {
        return this.#stringValue;
    }

    /**
     * Get the value.
     */
    get value(): InputValue<TPrimitive, IsRequired> {
        if (this.isRequired && this.stringValue === "") {
            throw new Error("Attempted to retrieve value for input in initial state");
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type determination is handled above.
        return this.valueOf(this.stringValue) as InputValue<TPrimitive, IsRequired>;
    }

    /**
     * Get the error message.
     */
    get errorMessage(): string | undefined {
        return this.#errorMessage;
    }

    /**
     * Get the React set state callback.
     */
    get setState(): Dispatch<SetStateAction<InputState<TFormData, TTypeString, TPrimitive, IsRequired>>> {
        return this.#setState;
    }
}
