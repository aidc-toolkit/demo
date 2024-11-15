import { i18nAddResourceBundle, i18nAssertValidResources, i18next } from "@aidc-toolkit/core";
import { localeStrings as enLocaleStrings } from "./en/locale_strings.js";
import { localeStrings as frLocaleStrings } from "./fr/locale_strings.js";

export const demoNS = "aidct_demo";

i18nAssertValidResources(enLocaleStrings, "fr", frLocaleStrings);

i18nAddResourceBundle("en", demoNS, enLocaleStrings);
i18nAddResourceBundle("fr", demoNS, frLocaleStrings);

export default i18next;
