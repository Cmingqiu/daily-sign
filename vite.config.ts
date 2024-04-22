import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    watch: {
      exclude: ['node_modules/**', '/__uno.css']
    }
  },
  plugins: [uni(), UnoCSS()]
});
