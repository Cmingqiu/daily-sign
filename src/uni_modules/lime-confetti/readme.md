# lime-confetti 彩纸礼炮
- uniapp vue3 canvas 彩纸礼炮
- Q群 1169785031


### 安装
- 在市场导入插件即可在任意页面使用，无须再`import`

### 使用
- 提供简单的使用示例，更多请查看下方的demo

```html
<view style="height: 750rpx;">
	<l-confetti ref="confettiRef" @done="done"></l-confetti>
</view>
<button @click="run1">basice cannon</button>
```
```js
const confettiRef = ref(null)
const run1 = () => {
	confettiRef.value.play({
		particleCount: 100,
		spread: 70,
		shapes: ['circle'],
		origin: {
			y: 0.6
		}
	})
}
const done = () => {
	console.log('礼炮播放完毕')
}
```

### 查看示例
- 导入后直接使用这个标签查看演示效果

```vue
// 代码位于 uni_modules/lime-confetti/compoents/lime-confetti
<lime-confetti />
```



### 插件标签
- 默认 l-confetti 为 component
- 默认 lime-confetti 为 demo


### vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可,官方是把它单独成了一个文件.
```js
// main.js
// vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```

另外插件也用到了TS，vue2可能会遇过官方的TS版本过低的问题,找到HX目录下的`compile-typescript`目录
```cmd
// \HBuilderX\plugins\compile-typescript
yarn add typescript -D
- or - 
npm install typescript -D
```




```html
<view style="height: 750rpx;">
	<l-confetti ref="confettiRef" @done="done"></l-confetti>
</view>
<button @click="run1">basice cannon</button>
```
```js
export default {
	methods: {
		run1(){
			this.$refs.confettiRef.play({
				particleCount: 100,
				spread: 70,
				shapes: ['circle'],
				origin: {
					y: 0.6
				}
			})
		},
		done(){
			console.log('礼炮播放完毕')
		}
	}
}
```



## API

### Events
| 参数                       | 说明                                                         | 参数             | 
| --------------------------| ------------------------------------------------------------ | ---------------- |
| done              		| 动画播放完成  |  | 


### Expose
| 参数                       | 说明                                                         | 参数             | 
| --------------------------| ------------------------------------------------------------ | ---------------- |
| play(options)             | 播放, `options` 为参数对象     |  | 

### OPtions
| 参数                       | 说明                                                         | 默认值             | 
| --------------------------| ------------------------------------------------------------ | ---------------- |
| particleCount              | 纸屑数量     		| `50` | 
| angle               		 | 发射角度     | `90` | 
| spread                	 | 偏离     | `45` | 
| startVelocity              | 速度     | `45` | 
| decay                     | 衰变     | `0.9` | 
| gravity                      | 重力      | `1` | 
| drift                       | 漂移      | `0` | 
| ticks                       | 移动次数      | `200` | 
| origin                      | 开始发射坐标      | `{x: 0.5,y:0.5}` | 
| colors                      | 颜色数组，只支持HEX      | `[]` | 
| shapes                      | 形状，可选 `square`,`circle`,`star`     | `混合` | 
| scalar                       | 每个纸宵的缩放因子     | `1` | 



## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)