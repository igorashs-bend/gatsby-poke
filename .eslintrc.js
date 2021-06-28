module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },

  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier/prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    camelcase: 'off',
  },
};
