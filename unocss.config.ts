import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerVariantGroup
} from 'unocss';

// 指令
import transformerDirectives from '@unocss/transformer-directives';

import presetWeapp from 'unocss-preset-weapp';
import {
  extractorAttributify,
  transformerClass
} from 'unocss-preset-weapp/transformer';
// 可以写属性会自动增加class,也可以写class
const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify();

const remRE = /^-?[\.\d]+rem$/;

export default defineConfig({
  presets: [presetWeapp(), presetWeappAttributify()],
  rules: [
    /* [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${Number(d) * 8}rpx` })] */
  ],
  theme: {
    // 解决小程序不支持 * 选择器
    preflightRoot: ['page,::before,::after']
  },
  // 自定义rem 转 rpx
  postprocess(util) {
    util.entries.forEach(i => {
      const value = i[1];
      if (value && typeof value === 'string' && remRE.test(value))
        i[1] = Number(value.slice(0, -3)) * 16 * 2 + `rpx`;
    });
  },
  transformers: [
    transformerAttributify(),
    transformerClass(),
    // @ts-expect-error
    transformerDirectives()
  ],
  shortcuts: [{ 'flex-center': 'flex items-center justify-center' }]
  // separators: '__'
});

// /* // @ts-expect-error 插件类型不匹配 */
