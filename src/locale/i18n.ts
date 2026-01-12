import { i18nCoreInit, type I18nEnvironment, i18nInit } from "@aidc-toolkit/core";
import { i18nGS1Init } from "@aidc-toolkit/gs1";
import { i18nUtilityInit } from "@aidc-toolkit/utility";
import i18next, { type i18n, type Resource } from "i18next";
import enLocaleResources from "./en/locale-resources.js";
import frLocaleResources from "./fr/locale-resources.js";

const demoNS = "aidct_demo";

/**
 * Locale strings type is extracted from the English locale strings object.
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

// Explicit type is necessary because type can't be inferred without additional references.
export const i18nextDemo: i18n = i18next.createInstance();

/**
 * Initialize internationalization.
 *
 * @param environment
 * Environment in which the application is running.
 *
 * @param debug
 * Debug setting.
 *
 * @returns
 * Demo resource bundle.
 */
export async function i18nDemoInit(environment: I18nEnvironment, debug = false): Promise<Resource> {
    return i18nInit(i18nextDemo, environment, debug, demoNS, demoResourceBundle, i18nCoreInit, i18nUtilityInit, i18nGS1Init);
}
