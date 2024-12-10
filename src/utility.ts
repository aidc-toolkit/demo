import i18next, { demoNS } from "./locale/i18n.ts";

/**
 * Display a confirmation message if the number of strings to be created is greater than 1,000.
 *
 * @param count
 * Number of strings to be created.
 *
 * @param createStrings
 * Callback to create the strings.
 *
 * @returns
 * Callback result if strings should be created or undefined if not.
 */
export function confirmCreateStrings(count: number, createStrings: () => Iterable<string>): Iterable<string> | undefined {
    return count <= 1000 || confirm(i18next.t("Demo.confirmCreateStrings", {
        ns: demoNS,
        count
    })) ?
        createStrings() :
        undefined;
}
