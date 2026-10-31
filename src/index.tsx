import { i18nCoreBrowserLanguageDetector } from "@aidc-toolkit/core";
import i18next from "i18next";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { i18nDemoInit, i18nextDemoT } from "./locale/i18n.js";

i18nDemoInit(i18next.use(i18nCoreBrowserLanguageDetector)).then(() => {
    document.title = `${i18nextDemoT("App.title")} - ${i18nextDemoT("Demo.demo")}`;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Root element must be defined for app to work.
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}).catch((e: unknown) => {
    console.error(e);

    // eslint-disable-next-line no-alert -- Failure on application startup requires alert.
    alert(e);
});
