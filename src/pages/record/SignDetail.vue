<template>
  <view class="border-[#8816ec]" mt-2 p-y-2 border-0 border-t-4 border-solid>
    <view v-if="detail[0] || detail[1]">
      <view>
        <text class="label">上班 {{ detail[0]?.time || '未打卡' }}</text>
      </view>
      <view h-200></view>
      <text class="label">下班 {{ detail[1]?.time || '未打卡' }}</text>
      <view class="text-[#8816ec]" mt-6 text-20 text-center @click="updateTime"
        >更新时间</view
      >
    </view>
    <view flex flex-col justify-center items-center v-else>
      <image h-211 mode="aspectFit" src="@/static/no-sign-record.svg" />
      <text class="no-data-tip" mt-2>当天没有打卡记录</text>
    </view>
  </view>

  <up-picker
    :show="showPicker"
    :columns="['上班', '下班']"
    confirmColor="#8816ec"></up-picker>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

withDefaults(
  defineProps<{
    detail: Array<Record<string, any> | null>;
  }>(),
  {
    detail: () => []
  }
);

const showPicker = ref(false);
const cols = ['上班', '下班'];
const pickerOptions = computed(() => cols);
const updateTime = () => {
  showPicker.value = true;
};
</script>

<style scoped lang="scss">
.label {
  @apply text-lg;
}
</style>
