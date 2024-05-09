<template>
  <LayoutContainer>
    <view flex items-center>
      <view class="rounded-[50%]" w-100 h-100 mr-3 overflow-hidden>
        <open-data type="userAvatarUrl" />
      </view>
      <open-data font-bold type="userNickName" />
    </view>
  </LayoutContainer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
