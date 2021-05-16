module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  ignorePatterns: ["**/node_modules/*", "**/build/*", "**/dist/*", "**/.out/*", "**/!.prettierrc.js"],
  env: {
    node: true,
  },
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ["./client/**/*.ts", "./client/**/*.tsx"],
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es2017: true,
        jest: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // TypeScript rules
        "plugin:react/recommended", // React rules
        "plugin:react-hooks/recommended", // React hooks rules
        "plugin:jsx-a11y/recommended", // Accessibility rules
        "plugin:prettier/recommended", // Prettier recommended rules
      ],
      rules: {
        "react/prop-types": "off", // We will use TypeScript's types for component props instead
        "react/react-in-jsx-scope": "off", // No need to import React when using Next.js
        "jsx-a11y/anchor-is-valid": "off", // This rule is not compatible with Next.js's <Link /> components
        "@typescript-eslint/no-unused-vars": ["error"], // Why would you want unused vars?
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
    {
      files: ["./server/**/*.ts", "./server/**/*.tsx"],
      parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
      },
      extends: [
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      ],
    }
  ],
};
