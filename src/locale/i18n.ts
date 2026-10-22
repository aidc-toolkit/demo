import { i18nCoreInit, i18nextInstance, i18nInit, type I18nLanguageDetector } from "@aidc-toolkit/core";
import { i18nGS1Init } from "@aidc-toolkit/gs1";
import { i18nUtilityInit } from "@aidc-toolkit/utility";
import type { ParseKeys, Resource } from "i18next";
import enLocaleResources from "./en/locale-resources.js";
import frLocaleResources from "./fr/locale-resources.js";

/**
 * Demo namespace.
 */
export const demoNS = "aidct_demo";

/**
 * Demo parse keys.
 */
export type DemoParseKeys = ParseKeys<typeof demoNS>;

/**
 * Locale resources type is extracted from the English locale strings object.
 */
export type DemoLocaleResources = typeof enLocaleResources;

/**
 * Demo resource bundle.
 */
const demoResourceBundle = {
    en: {
        aidct_demo: enLocaleResources
    },
    fr: {
        aidct_demo: frLocaleResources
    }
};

/**
 * Demo i18next translator function.
 */
export const i18nextDemoT = i18nextInstance.getFixedT(null, demoNS);

/**
 * Initialize internationalization.
 *
 * @param languageDetector
 * Language detector.
 *
 * @param debug
 * Debug setting.
 *
 * @returns
 * Demo resource bundle.
 */
export async function i18nDemoInit(languageDetector: I18nLanguageDetector, debug = false): Promise<Resource> {
    return i18nInit(languageDetector, debug, demoResourceBundle, i18nCoreInit, i18nUtilityInit, i18nGS1Init);
}
