import type { localeStrings } from "./en/locale_strings.js";

/**
 * Internationalization module.
 */
declare module "i18next" {
    /**
     * Custom type options for this package.
     */
    interface CustomTypeOptions {
        resources: {
            // Extract the type from the English locale strings object.
            aidct_demo: typeof localeStrings;
        };
    }
}
