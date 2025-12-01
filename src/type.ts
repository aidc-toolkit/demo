/**
 * Create type for type strings.
 */
export type TypeString = "string" | "number" | "boolean";

/**
 * Map a string to its equivalent primitive type.
 */
export type Primitive<T extends TypeString> = [T] extends ["string"] ? string : [T] extends ["number"] ? number : [T] extends ["boolean"] ? boolean : string | number | boolean;

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
