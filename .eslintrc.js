module.exports = {
  root: true,
  parser: 'typescript-eslint-parser',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html',
    'typescript'
  ],
  'rules': {
    // 'omitLastInOneLineBlock': false,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'camelcase': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 0,
    'space-before-function-paren': 0
  }
}
