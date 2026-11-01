import { i18nCoreInit, i18nInit } from "@aidc-toolkit/core";
import { i18nGS1Init } from "@aidc-toolkit/gs1";
import { i18nUtilityInit } from "@aidc-toolkit/utility";
import type { i18n, ParseKeys, Resource, TFunction } from "i18next";
import enLocaleResources from "./en/locale-resources.js";
import frLocaleResources from "./fr/locale-resources.js";

/**
 * Demo namespace.
 */
export const demoNS = "aidct_demo";

/**
 * Locale resources type is extracted from the English locale resources object.
 */
export type DemoLocaleResources = typeof enLocaleResources;

/**
 * Core locale resources augmentation.
 */
declare module "@aidc-toolkit/core" {
    /**
     * Internationalization locale resources.
     */
    export interface I18nLocaleResources {
        /**
         * Demo locale resources.
         */
        [demoNS]: DemoLocaleResources;
    }
}

/**
 * Demo parse keys.
 */
export type DemoParseKeys = ParseKeys<typeof demoNS>;

/**
 * Demo resource bundle.
 */
const demoResourceBundle = {
    en: {
        [demoNS]: enLocaleResources
    },
    fr: {
        [demoNS]: frLocaleResources
    }
};

/**
 * Demo i18next translator function.
 */
export let i18nextDemoT: TFunction<typeof demoNS>;

/**
 * Initialize internationalization.
 *
 * @param i18next
 * Internationalization instance.
 *
 * @param debug
 * Debug setting.
 *
 * @returns
 * Demo resource bundle.
 */
export async function i18nDemoInit(i18next: i18n, debug = false): Promise<Resource> {
    // Bind translator function to i18next.
    i18nextDemoT = i18next.getFixedT(null, demoNS);

    return i18nInit(i18next, debug, demoResourceBundle, i18nCoreInit, i18nUtilityInit, i18nGS1Init);
}
