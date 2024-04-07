import { createSSRApp } from 'vue';
import App from './App.vue';

import uviewPlus from 'uview-plus';
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  // uview-plus设置默认单位为rpx
  uni.$u.config.unit = 'rpx';

  return {
    app
  };
}
