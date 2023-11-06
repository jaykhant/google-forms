module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    requireConfigFile: false,
    babelOptions: {
      "presets": ["@babel/preset-react"]
    },
  },
  rules:{
    "no-unused-vars": [
      "error",
      {
          "varsIgnorePattern": "React"
      }
  ]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
