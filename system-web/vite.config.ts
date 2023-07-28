/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-03-25 22:06:36
 * @LastEditTime: 2023-07-28 11:32:04
 * @LastEditors: huazj
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import styleImport, {AntdResolve} from 'vite-plugin-style-import';

export default defineConfig({
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled: true,  //注意，这一句是在less对象中，写在外边不起作用
        modifyVars:{ //在这里进行主题的修改，参考官方配置属性
          '@primary-color': '#1DA57A',
        },
      }
    }
  },
  plugins: [
    react(),
    styleImport({
      resolves: [
        AntdResolve()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    port: 8080,
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '^/api/': {
        target: 'http://localhost:3000/api',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '^/img/': {
        target: 'http://localhost:3000',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, '/')
      },
      /* <img src="/img/default" alt="" /> */
    }
  }
})
