/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    'src/**/database/migrations/**',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unsafe-unary-minus': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-find': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/sort-type-constituents': 'error',

    // Отключено из-за неудобства использования с any объектами.
    '@typescript-eslint/restrict-template-expressions': 'off',
    // Отключено из-за противоречия "noPropertyAccessFromIndexSignature" из tsconfig.
    '@typescript-eslint/dot-notation': 'off',
    // Отключено из-за неудобства использования в функциях.
    '@typescript-eslint/no-confusing-void-expression': 'off',
    // Отключено из-за возможности наличия слишком сложных для описания типов.
    '@typescript-eslint/no-explicit-any': 'off',
    // Отключено из-за модулей NestJS.
    '@typescript-eslint/no-extraneous-class': 'off',
    // Отключено из-за неудобства использования.
    '@typescript-eslint/no-redundant-type-constituents': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',

    // Правила с более гибкими настройками.
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/method-signature-style': ['error', 'method'],

    '@typescript-eslint/naming-convention': [
      'error',
      // accessor ( get, set ), function, method, classMethod,
      // variable ( не const ), property ( не static const )
      {
        selector: 'default',
        format: ['camelCase'],
      },

      {
        selector: ['variable'],
        modifiers: ['const', 'exported'],
        format: ['UPPER_CASE'],
      },

      // Исключение для декораторов
      {
        selector: ['function'],
        modifiers: ['exported'],
        format: ['camelCase', 'PascalCase'],
      },

      // classProperty, objectLiteralProperty, typeProperty
      {
        selector: ['property'],
        modifiers: ['static', 'readonly'],
        format: ['UPPER_CASE'],
      },

      {
        selector: ['objectLiteralProperty'],
        format: [
          'camelCase',
          // Исключение для валидации env файла
          'UPPER_CASE',
        ],
      },

      {
        selector: ['parameter'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },

      // class, enum, typeAlias, typeParameter
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },

      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },

      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],

    // Расширение стандартных правил.
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'error',

    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': 'warn',

    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': 'error',

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',

    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'always'],
  },
};
