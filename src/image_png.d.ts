// Allow properly-typed PNG image imports.
declare module "*.png" {
    const value: string;
    export = value;
}
