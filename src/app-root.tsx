import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { I18n } from "./I18n.jsx";
import { i18nextDemo } from "./locale/i18n.js";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Root element must be defined for app to work.
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <I18n postInitialization={() => {
            document.title = `${i18nextDemo.t("App.title")} - ${i18nextDemo.t("Demo.demo")}`;
        }}>
            <App />
        </I18n>
    </StrictMode>
);
