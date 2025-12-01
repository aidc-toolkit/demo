import type { PropertyKeys } from "@aidc-toolkit/core";
import type { Dispatch, SetStateAction } from "react";
import type { Primitive, TypeString } from "./type";

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
    private readonly _name: PropertyKeys<TFormData, TPrimitive>;

    /**
     * Input type.
     */
    private readonly _type: TTypeString;

    /**
     * True if input is required.
     */
    private readonly _isRequired: IsRequired;

    /**
     * Default string value.
     */
    private readonly _defaultStringValue: string;

    /**
     * String value.
     */
    private readonly _stringValue: string;

    /**
     * Error message.
     */
    private readonly _errorMessage: string | undefined;

    /**
     * React set state callback.
     */
    private _setState!: Dispatch<SetStateAction<InputState<TFormData, TTypeString, TPrimitive, IsRequired>>>;

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
        this._name = name;
        this._type = type;
        this._isRequired = isRequired;
        this._defaultStringValue = defaultStringValue;
        this._stringValue = stringValue !== undefined && stringValue !== "" ? stringValue : defaultStringValue;
        this._errorMessage = errorMessage;
    }

    /**
     * Save this input state's set state callback.
     *
     * @param setState
     * React set state callback.
     */
    saveSetState(setState: Dispatch<SetStateAction<InputState<TFormData, TTypeString, TPrimitive, IsRequired>>>): void {
        this._setState = setState;
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
        return this._name;
    }

    /**
     * Get the input type.
     */
    get type(): TTypeString {
        return this._type;
    }

    /**
     * Determine if input is required.
     */
    get isRequired(): IsRequired {
        return this._isRequired;
    }

    /**
     * Get the default string value.
     */
    get defaultStringValue(): string {
        return this._defaultStringValue;
    }

    /**
     * Get the string value.
     */
    get stringValue(): string {
        return this._stringValue;
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
        return this._errorMessage;
    }

    /**
     * Get the React set state callback.
     */
    get setState(): Dispatch<SetStateAction<InputState<TFormData, TTypeString, TPrimitive, IsRequired>>> {
        return this._setState;
    }
}
