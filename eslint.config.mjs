import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      ".next/**",
      "public/**/*.js",
      "tsconfig.json",
      "eslint.config.mjs",
      "next.config.mjs",
      "postcss.config.cjs",
      "i18n/translation_generator.cjs",
      "vitest.config.ts",
      "scripts/**",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/strict",
      "plugin:jsx-a11y/recommended",
      "plugin:prettier/recommended",
      "plugin:react/recommended",
    ),
  ),

  next.configs["recommended"],

  {
    plugins: { "react-hooks": reactHooks },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: false,
        project: "./tsconfig.json",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowTernary: true, // allow cond ? fnA() : fnB()
          allowShortCircuit: true, // allow  cond && fn()
          allowTaggedTemplates: true, // allow styled-components
        },
      ],
      "jsx-a11y/anchor-is-valid": "off",

      "jsx-a11y/no-autofocus": [
        2,
        {
          ignoreNonDOM: true,
        },
      ],

      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",

      "no-constant-binary-expression": "off",

      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },
];
