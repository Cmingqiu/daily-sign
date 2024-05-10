<template>
  <view class="border-[#8816ec]" mt-2 p-y-2 border-0 border-t-4 border-solid>
    <view v-if="detail.length">
      <view>
        <text class="label">上班 {{ detail[0]?.time || '未打卡' }}</text>
      </view>
      <view h-200></view>
      <text class="label">下班 {{ detail[1]?.time || '未打卡' }}</text>
      <view
        class="text-[#8816ec]"
        mt-6
        text-20
        text-center
        @click="showPicker = true">
        更新时间
      </view>
    </view>
    <view flex flex-col justify-center items-center v-else>
      <image h-211 mode="aspectFit" src="@/static/no-sign-record.svg" />
      <text class="no-data-tip" mt-2>当天没有打卡记录</text>
    </view>
  </view>

  <up-picker
    ref="uPickerRef"
    :show="showPicker"
    :columns="pickerColumns"
    :defaultIndex="defaultPickerIndex"
    confirmColor="#8816ec"
    closeOnClickOverlay
    @close="showPicker = false"
    @cancel="showPicker = false"
    @confirm="pickerConfirm" />
</template>

<script setup lang="ts">
import {} from 'vue';
import usePicker, { type ISignDetail } from './hooks/usePicker';

// todo: uni-app 暂不支持导入defineProps的类型
interface IRecodeDetail {
  detail: Array<ISignDetail | null>;
}

const props = withDefaults(defineProps<IRecodeDetail>(), {
  detail: () => []
});
const {
  uPickerRef,
  defaultPickerIndex,
  showPicker,
  pickerColumns,
  pickerConfirm
} = usePicker(props);
</script>

<style scoped lang="scss">
.label {
  @apply text-lg;
}
</style>
