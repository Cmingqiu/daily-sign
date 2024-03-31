<template>
  <LayoutContainer>
    <view class="record">
      <view class="item" v-for="(item, i) in recordList" :key="i">{{
        item
      }}</view>
    </view>
  </LayoutContainer>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const recordList = ref<string[]>([]);

onMounted(() => {
  const signedCacheKeys = uni.getStorageInfoSync().keys;
  signedCacheKeys.forEach(key => {
    const list = uni.getStorageSync(key);
    recordList.value.push(`${key} ${list[0]}`);
    recordList.value.push(`${key} ${list[1]}`);
  });
});
</script>

<style lang="scss" scoped>
.record {
  .item {
    margin-bottom: 15rpx;
  }
}
</style>
