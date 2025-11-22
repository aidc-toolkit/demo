/**
 * Make some keys within a type optional.
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Create type for type strings.
 */
export type TypeString = "string" | "number" | "boolean";

/**
 * Map a string to its equivalent primitive type.
 */
export type Primitive<T extends TypeString> = [T] extends ["string"] ? string : [T] extends ["number"] ? number : [T] extends ["boolean"] ? boolean : string | number | boolean;

/**
 * Type to restrict property keys to those that are strings and that support a specified type.
 */
export type PropertyKeys<T, TProperty> = {
    [K in keyof T]: K extends string ? T[K] extends TProperty ? K : never : never;
}[keyof T];

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
