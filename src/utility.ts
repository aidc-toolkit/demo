import i18next, { demoNS } from "./locale/i18n.ts";

/**
 * Display a confirmation message if the number of strings to be created is greater than 1,000.
 *
 * @param count
 * Number of strings to be created.
 *
 * @returns
 * True if strings should be created.
 */
export function confirmCreateStrings(count: number): boolean {
    return count <= 1000 || confirm(i18next.t("Demo.confirmCreateStrings", {
        ns: demoNS,
        count
    }));
}
