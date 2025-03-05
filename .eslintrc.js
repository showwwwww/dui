module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // should work with .prettierrc
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'import',
    'unicorn', // optional and recommended plugin
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {
    // TypeScript strict rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',

    // React strict rules
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'error',

    // Enhance code quality
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-implicit-coercion': 'error',
    'no-nested-ternary': 'error',
    'no-param-reassign': 'error',
    'prefer-const': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',

    // JSX acessibility
    'jsx-a11y/no-autofocus': [
      'error',
      {
        ignoreNonDOM: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.json'],
      extends: ['plugin:json/recommended'],
      plugins: ['json'],
      rules: {
        'json/*': ['error', { allowComments: true }],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
    {
      files: ['src/**/*.{ts, tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules', '.next', 'out', 'dist', 'build', '*.d.ts'],
};
