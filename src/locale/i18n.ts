import { i18nCoreInit, type I18nEnvironment } from "@aidc-toolkit/core";
import { gs1Resources, i18nGS1Init } from "@aidc-toolkit/gs1";
import { i18nUtilityInit, utilityResources } from "@aidc-toolkit/utility";
import i18next, { type i18n } from "i18next";
import enLocaleResources from "./en/locale-resources";
import frLocaleResources from "./fr/locale-resources";

const demoNS = "aidct_demo";

/**
 * Locale strings type is extracted from the English locale strings object.
 */
export type DemoLocaleResources = typeof enLocaleResources;

/**
 * Demo resources.
 */
const demoResources = {
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
 * Void promise.
 */
export async function i18nDemoInit(environment: I18nEnvironment, debug = false): Promise<void> {
    await i18nUtilityInit(environment, debug);
    await i18nGS1Init(environment, debug);
    await i18nCoreInit(i18nextDemo, environment, debug, demoNS, utilityResources, gs1Resources, demoResources);
}
