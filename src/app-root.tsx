import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Root element must be defined for app to work.
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
