<template>
  <view class="border-[#8816ec]" mt-2 p-y-2 border-0 border-t-4 border-solid>
    <view v-if="detail[0] || detail[1]">
      <text class="label">上班 {{ detail[0] || '未打卡' }}</text>
      <view h-200></view>
      <text class="label">下班 {{ detail[1] || '未打卡' }}</text>
    </view>
    <view flex flex-col justify-center items-center v-else>
      <image h-211 mode="aspectFit" src="@/static/no-sign-record.svg" />
      <text class="no-data-tip" mt-2>当天没有打卡记录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    detail: Array<string | null>;
  }>(),
  {
    detail: () => []
  }
);
</script>

<style scoped lang="scss">
.label {
  @apply text-lg font-bold;
}
</style>
