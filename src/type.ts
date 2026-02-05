/**
 * Create type for type strings.
 */
export type TypeString = "string" | "number" | "boolean";

/**
 * Map a string to its equivalent primitive type.
 */
export type Primitive<T extends TypeString> = [T] extends ["string"] ? string : [T] extends ["number"] ? number : [T] extends ["boolean"] ? boolean : string | number | boolean;
