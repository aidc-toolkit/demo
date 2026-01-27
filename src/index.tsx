import { I18nEnvironments } from "@aidc-toolkit/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { i18nDemoInit, i18nextDemo } from "./locale/i18n.js";

i18nDemoInit(I18nEnvironments.Browser).then(() => {
    document.title = `${i18nextDemo.t("App.title")} - ${i18nextDemo.t("Demo.demo")}`;

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
