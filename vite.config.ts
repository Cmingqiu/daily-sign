import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import UnoCSS from 'unocss/vite';

const buildOptions = {
  watch: {
    exclude: ['node_modules/**', '/__uno.css']
  }
};
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    // 开发时bug: resource busy or locked, lstat 'C:\DumpStack.log.tmp'
    ...(isDev && buildOptions)
  },
  plugins: [uni(), UnoCSS()]
});
