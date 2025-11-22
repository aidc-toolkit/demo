import { esLintConfigAIDCToolkit } from "@aidc-toolkit/dev";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
    ...esLintConfigAIDCToolkit,
    reactHooks.configs.flat.recommended,
    {
        languageOptions: {
            globals: globals.browser
        },
        plugins: {
            "react-refresh": reactRefresh
        },
        rules: {
            "no-alert": "off",
            "no-console": "off",

            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true
                }
            ],
            "@stylistic/jsx-closing-bracket-location": "off",
            "@stylistic/jsx-closing-tag-location": "off",
            "@stylistic/jsx-curly-spacing": [
                "error",
                {
                    when: "never",
                    children: true
                }
            ],
            "@stylistic/jsx-indent-props": ["error", 4],
            "@stylistic/jsx-wrap-multilines": "off"
        }
    }
]);
