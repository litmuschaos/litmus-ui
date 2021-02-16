const rules = {
  ON: 2,
  OFF: 0,
  WARN: 1,
};

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-undef': rules.ON,
    '@typescript-eslint/explicit-function-return-type': rules.OFF,
    '@typescript-eslint/no-non-null-assertion': rules.OFF,
    '@typescript-eslint/no-unused-vars': rules.WARN,
    '@typescript-eslint/no-explicit-any': rules.OFF,
    'react/no-deprecated': rules.OFF,
    'react/prop-types': rules.OFF,
    'react-hooks/rules-of-hooks': rules.ON,
    'react-hooks/exhaustive-deps': rules.WARN,
    'react/static-property-placement': [
      'warn',
      'property assignment',
      { defaultProps: 'static public field' },
    ],
    'lines-between-class-members': rules.OFF,
    'no-restricted-syntax': rules.OFF,
    'no-nested-ternary': rules.OFF,
    'no-plusplus': rules.OFF,
    'multiline-ternary': rules.OFF,
    'no-useless-constructor': rules.OFF,
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        comments: 100,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      rules.ON,
      {
        selector: 'typeLike',
        format: ['StrictPascalCase'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
