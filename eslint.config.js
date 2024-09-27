import tseslint from "typescript-eslint";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import esLintConfigLove from "eslint-config-love";
import { esLintConfigAIDCToolkit } from "@aidc-toolkit/dev";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
    {
        ignores: ["eslint.config.js", "dist"]
    },
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    stylistic.configs["recommended-flat"],
    jsdoc.configs["flat/recommended-typescript"],
    esLintConfigLove,
    esLintConfigAIDCToolkit,
    {
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
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
