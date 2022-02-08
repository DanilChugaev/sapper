/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'codex/ts'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  globals: {
    'CanvasImageSource': true,
    'PixelsAmount': true,
    'Cell': true,
    'CellAmount': true,
    'FieldCoordinate': true,
    'Nullable': true,
    'Color': true,
    'BombPositions': true,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-magic-numbers': 0,
    '@typescript-eslint/no-var-requires': 0,
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
    'comma-dangle': ["error", {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    }]
  }
}
