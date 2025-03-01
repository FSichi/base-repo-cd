import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import configPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
    { ignores: ["dist"] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended, configPrettier],
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        prettier,
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["warn", { typedefs: false }],
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        "prettier/prettier": "error", // <-- Hacer que ESLint use Prettier
      },
    },
    configPrettier
)
