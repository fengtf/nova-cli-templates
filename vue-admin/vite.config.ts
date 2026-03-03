import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 获取环境变量
const BUILD_ENV = process.env.BUILD_ENV || 'development'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
          imports: ['vue', 'vue-router', 'pinia'],
          dts: true
        }),
        Components({
          resolvers: [ElementPlusResolver()],
          dts: true
        })
      ],
      define: {
        BUILD_ENV: JSON.stringify(BUILD_ENV)
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      },
      server: {
        port: 3000,
        open: true,
        proxy: {
          '/api': {
            target: 'https://console-askaway.develenv.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        assetsDir: 'assets', // 静态资源目录名，默认就是 assets
        rollupOptions: {
          output: {
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',
            assetFileNames: 'assets/[name].[hash][extname]', // 强制所有静态资源都输出到 assets 目录
          }
        }
      },
      base: env.CDN_URL_PREFIX || "/"
    }
  }
) 