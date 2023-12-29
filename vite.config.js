import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
// 自动导入相关插件
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// 检查性能的插件
import Inspect from 'vite-plugin-inspect';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const pathSrc = resolve(__dirname, 'src');
export default {
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  root: process.cwd(),
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  // 服务端渲染
  server: {
    host: '0.0.0.0',
    port: 8081,
    open: true,
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    UnoCSS({
      hmrTopLevelAwait: false,
    }),
    AutoImport({
      eslintrc: {
        enabled: true, // eslint报错问题
      },
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', '@vueuse/core'],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      vueTemplate: true,
      // 是否自动生成d.ts文件，用于ts报错
      dts: false,
    }),

    Components({
      resolvers: [
      // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
      // 是否自动生成d.ts文件，用于ts报错
      dts: false,
    }),

    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  optimizeDeps: {
    include: ['vue',
      'vue-router',
      'pinia',
      'axios',
      'element-plus/es/components/form/style/css',
      'element-plus/es/components/form-item/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/input-number/style/css',
      'element-plus/es/components/switch/style/css',
      'element-plus/es/components/upload/style/css',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/col/style/css',
      'element-plus/es/components/icon/style/css',
      'element-plus/es/components/row/style/css',
      'element-plus/es/components/tag/style/css',
      'element-plus/es/components/dialog/style/css',
      'element-plus/es/components/loading/style/css',
      'element-plus/es/components/radio/style/css',
      'element-plus/es/components/radio-group/style/css',
      'element-plus/es/components/popover/style/css',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/tooltip/style/css',
      'element-plus/es/components/dropdown/style/css',
      'element-plus/es/components/dropdown-menu/style/css',
      'element-plus/es/components/dropdown-item/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/divider/style/css',
      'element-plus/es/components/card/style/css',
      'element-plus/es/components/link/style/css',
      'element-plus/es/components/breadcrumb/style/css',
      'element-plus/es/components/breadcrumb-item/style/css',
      'element-plus/es/components/table/style/css',
      'element-plus/es/components/tree-select/style/css',
      'element-plus/es/components/table-column/style/css',
      'element-plus/es/components/select/style/css',
      'element-plus/es/components/option/style/css',
      'element-plus/es/components/pagination/style/css',
      'element-plus/es/components/tree/style/css',
      'element-plus/es/components/alert/style/css',
      'element-plus/es/components/radio-button/style/css',
      'element-plus/es/components/checkbox-group/style/css',
      'element-plus/es/components/checkbox/style/css',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/tab-pane/style/css',
      'element-plus/es/components/rate/style/css',
      'element-plus/es/components/date-picker/style/css',
      'element-plus/es/components/notification/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/statistic/style/css',
      'element-plus/es/components/watermark/style/css',
      'element-plus/es/components/config-provider/style/css',
      '@vueuse/core',
      'echarts'],
  },
  build: {
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 配置这个是让不同类型文件放在不同文件夹，不会显得太乱
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          // 静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString()
              .split('node_modules/')[1].split('/')[0].toString();
          }
          return null;
        },
      },
    },
    target: 'modules',
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态文件目录
    assetsInlineLimit: '4096', // 小于此阈值的导入或引用资源将内联为 base64 编码
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    emptyOutDir: true, // 打包前先清空原有打包文件
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/theme/index.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  define: {
    __INTLIFY_PROD_DEVTOOLS__: false,
    'process.env': process.env,
  },
};
