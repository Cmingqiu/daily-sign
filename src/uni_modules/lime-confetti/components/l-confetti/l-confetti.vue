<template>
  <view class="l-confetti" v-if="!isDestroy">
    <canvas
      class="l-confetti__canvas"
      :canvas-id="canvasId"
      :id="canvasId"
      type="2d"></canvas>
  </view>
</template>
<script lang="ts">
// @ts-nocheck
import {
  getCurrentInstance,
  watch,
  onUnmounted,
  defineComponent,
  ref
} from './vue';
import { useCanvas } from './useCanvas';
import { Confetti } from './confetti';
import { Options } from './type.d.ts';
export default defineComponent({
  name: 'l-confetti',
  emits: ['done'],
  setup(props, { expose, emit }) {
    const app = getCurrentInstance();
    const canvasId = `l-confetti-${app.uid}`;
    const canvas = useCanvas(`#${canvasId}`, { context: app.proxy });
    let isDestroy = ref(false);
    let confetti = null;

    const play = (options: Options) => confetti.play(options);
    const done = () => emit('done');

    watch(
      canvas,
      v => {
        if (v) {
          confetti = new Confetti(canvas.value, { resize: true, done });
        }
      },
      { immediate: true }
    );

    onUnmounted(() => {
      isDestroy.value = true;
      confetti = null;
    });
    // #ifdef VUE3
    expose({
      play
    });
    // #endif
    return {
      isDestroy,
      canvasId,

      // #ifndef VUE3
      // 由于VUE2 是通过返回暴露方法，故使用返回
      play
      // #endif
    };
  }
});
</script>
<style lang="scss">
.l-confetti {
  width: 100%;
  height: 100%;
  &__canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
