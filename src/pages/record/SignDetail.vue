<template>
  <view class="border-[#8816ec]" mt-2 p-y-2 border-0 border-t-4 border-solid>
    <view v-if="detail.length">
      <text text-lg font-bold>上班 {{ detail[0] || '未打卡' }}</text>
      <view h-200></view>
      <text text-lg font-bold>下班 {{ detail[1] || '未打卡' }}</text>
    </view>
    <view flex flex-col justify-center items-center v-else>
      <image w-422 h-256 src="@/static/no-sign-record.png" mode="scaleToFill" />
      <text mt-2>当天没有打卡记录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    detail: Array<string>;
  }>(),
  {
    detail: () => []
  }
);
</script>

<style scoped></style>
