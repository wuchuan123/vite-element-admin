module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // 继承，它所继承的东西，就是一份别人已经配置好的.eslintrc.js文件。
  extends: [
    'airbnb',
    'plugin:vue/vue3-recommended', // 使用插件支持vue3
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser',
  },
  plugins: ['vue'],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    // 解决这个报错 no-extraneous-dependencies
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: true, peerDependencies: true }],
    'vue/require-v-for-key': 'off', // 对保留元素检查 vue3中v-for会自动追加key值，所以不用再强制添加key属性，所以不检查key的填写
    'vue/valid-v-for': 'error', // 对于非保留(自定义)元素检查  vue3中v-for会自动追加key值，所以不用再强制添加key属性，所以不检查key的填写
    'no-debugger': 'warn', // 禁止出现debugger
    // 添加组件命名忽略规则 vue官方默认规则是多单词驼峰来进行组件命名
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off', // 去忽略v-html警告。
    'vue/no-unused-components': [2], // 禁止组件已注册但未使用的情况
    'vue/html-end-tags': 2, // html 需要有结束标签，除了自闭合标签
    'vue/html-closing-bracket-spacing': 2, // html 需要有结束标签，除了自闭合标签
    'vue/component-definition-name-casing': 0, // 自定义组件名称 - 驼峰和连字符
    'vue/attribute-hyphenation': 0, // 自定义属性名称 - 驼峰和连字符
  },
};
