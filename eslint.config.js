import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import configPrettier from "eslint-plugin-prettier";

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      quotes: "off",
      "quote-props": "off",
      semi: [1, "always", { omitLastInOneLineBlock: true }],
      "no-unused-expressions": "off",
      "no-unused-vars": "warn",
      "no-use-before-define": "off",
      "no-absolute-path": "off",
      "@typescript-eslint/no-use-before-define": ["error", { typedefs: false }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  configPrettier,
)
