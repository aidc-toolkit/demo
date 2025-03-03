import { esLintConfigAIDCToolkit } from "@aidc-toolkit/dev";
import type { TSESLint } from "@typescript-eslint/utils";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    ...esLintConfigAIDCToolkit,
    {
        languageOptions: {
            globals: globals.browser
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
        },
        rules: {
            "no-alert": "off",
            "no-console": "off",

            ...(reactHooks.configs.recommended.rules as Record<string, TSESLint.FlatConfig.RuleEntry>),
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
);
