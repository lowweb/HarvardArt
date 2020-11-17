module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/recommended'
  ],
  rules: {
    // 'no-console': 'off',

    // disable import in component
    'import/no-extraneous-dependencies': 'off',
    "import/no-unresolved": 'off',
    
    "no-shadow": ["error", { "allow": ["state"] }],
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "state",
          "acc",
          "e",
          "ctx",
          "req",
          "request",
          "res",
          "response",
          "$scope",
        ]
      }
    ],
  }
}
