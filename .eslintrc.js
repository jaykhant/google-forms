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
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
