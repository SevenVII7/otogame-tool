/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser' // 加這個可以 format ts 檔
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      1,
      {
        semi: false,
        singleQuote: true,
        arrowParens: 'always',
        bracketSpacing: true,
        trailingComma: 'none',
        printWidth: 150,
        htmlWhitespaceSensitivity: 'ignore',
        tabWidth: 2
      }
    ],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/v-slot-style': 'off',
    'vue/multi-word-component-names': 'off',
    'no-control-regex': 0,
    'vue/script-setup-uses-vars': 'off',
    'no-empty': 'warn',
    // 禁止出现空语句块
    'no-func-assign': 'error',
    // 禁止对Function声明重新赋值
    'no-unreachable': 'warn',
    // 禁止出现[return|throw]之后的代码块
    'no-empty-function': 'warn',
    // 禁止出现空的函数块
    'no-var': 'error',
    // 禁止出现var用let和const代替
    'no-delete-var': 'off',
    // 允许出现delete变量的使用
    'no-shadow': 'off',
    // 允许变量声明与外层作用域的变量同名
    'space-before-blocks': 'warn',
    // 要求在块之前使用一致的空格
    'space-unary-ops': 'warn',
    // 要求在一元操作符前后使用一致的空格
    'arrow-spacing': 'warn',
    // 要求箭头函数的箭头前后使用一致的空格
    'array-bracket-spacing': 'warn',
    // 要求数组方括号中使用一致的空格
    eqeqeq: 'error',
    // 要求使用 === 和 !==
    camelcase: 'warn',
    // 要求使用骆驼拼写法命名约定
    quotes: ['warn', 'single', 'avoid-escape'],
    // 要求统一使用单引号符号
    'no-duplicate-case': 'error', // 禁止出现重复case
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ]
  }
}
