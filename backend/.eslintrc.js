module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    'airbnb-base',
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "import/extensions": ["error", "never"],
    // note you must disable the base rule as it can report incorrect errors
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": ["error"],
    "no-underscore-dangle": ["error", { "allowAfterThis": true }]
  },
};
