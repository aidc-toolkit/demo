import { i18nAssertValidResources, i18nCoreInit, type I18NEnvironment } from "@aidc-toolkit/core";
import { gs1Resources, i18nGS1Init } from "@aidc-toolkit/gs1";
import { i18nUtilityInit, utilityResources } from "@aidc-toolkit/utility";
import i18next from "i18next";
import { localeStrings as enLocaleStrings } from "./en/locale-strings.js";
import { localeStrings as frLocaleStrings } from "./fr/locale-strings.js";

export const demoNS = "aidct_demo";

/**
 * Locale strings type is extracted from the English locale strings object.
 */
export type DemoLocaleStrings = typeof enLocaleStrings;

i18nAssertValidResources(enLocaleStrings, "fr", frLocaleStrings);

/**
 * Demo resources.
 */
const demoResources = {
    en: {
        aidct_demo: enLocaleStrings
    },
    fr: {
        aidct_demo: frLocaleStrings
    }
};

export const i18nextDemo = i18next.createInstance();

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
export async function i18nDemoInit(environment: I18NEnvironment, debug = false): Promise<void> {
    await i18nUtilityInit(environment, debug);
    await i18nGS1Init(environment, debug);
    await i18nCoreInit(i18nextDemo, environment, debug, demoNS, utilityResources, gs1Resources, demoResources);
}
