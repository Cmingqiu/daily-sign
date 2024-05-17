<template>
  <LayoutContainer>
    <view flex items-center>
      <button
        class="rounded-[50%]"
        w-100
        h-100
        ml-3
        mr-3
        px-0
        overflow-hidden
        text-center
        open-type="chooseAvatar"
        @chooseavatar="chooseAvatar">
        <!-- <open-data type="userAvatarUrl" /> -->
        <image w-100 h-100 :src="avatarUrl" mode="scaleToFill" />
      </button>

      <open-data font-bold type="userNickName" @click="addPhoneCalendar" />
    </view>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';

const defaultAvatar =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const avatarUrl = ref(defaultAvatar);
const chooseAvatar = (e: any) => {
  avatarUrl.value = e.detail.avatarUrl;
  /* uni.getUserProfile({
    desc: 'xx',
    success(result) {
      console.log('getUserProfile ', result);
    }
  }); */
};
onLoad(() => {
  uni.getSetting({
    success(res) {
      console.log('getSetting ', res);
    }
  });
});

const addPhoneCalendar = () => {
  const startTime =
    new Date(dayjs().add(2, 'm').format('YYYY/MM/DD HH:mm')).getTime() / 1000;
  wx.addPhoneCalendar({
    title: '测试*****',
    startTime,
    // endTime ,
    description: 'description',
    location: 'location',
    success(result) {
      console.log('success  ', result);
    },
    fail(result) {
      console.log('fail  ', result);
    }
  });
};

function handleAddCalendar() {
    wx.getSetting({
      success(res) {
        // 判断是否已经授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已授权，调用添加日程 API
              wx.addPhoneCalendar({
                title: '会议', // 日程标题，必填项
                startTime: new Date('2023/04/15 09:00').getTime()/1000, // 日程开始时间，必填项
                endTime: ''+new Date('2023/04/15 12:00').getTime()/1000, // 日程结束时间，必填项
                location: '北京市朝阳区东三环北路', // 日程地点，非必填项
                notes: '请大家准时参加会议', // 日程备注，非必填项
                success(res) {
                  console.log(res) // 日程添加成功的回调函数
                  wx.showToast({
                    title: '添加日程成功',
                    icon: 'success',
                    duration: 2000
                  })
                },
                fail(res) {
                  console.log(res) // 日程添加失败的回调函数
                  wx.showToast({
                    title: '添加日程失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            },
            fail() {
              // 用户拒绝授权，提示用户授权
              wx.showToast({
                title: '请先授权',
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else {
          // 已经授权，调用添加日程 API
          wx.addPhoneCalendar({
            title: '会议', // 日程标题，必填项
            startTime: new Date('2023/04/15 09:00').getTime()/1000, // 日程开始时间，必填项
            endTime: ''+new Date('2023/04/15 12:00').getTime()/1000, // 日程结束时间，必填项
            location: '北京市朝阳区东三环北路', // 日程地点，非必填项
            notes: '请大家准时参加会议', // 日程备注，非必填项
            success(res) {
              console.log(res) // 日程添加成功的回调函数
              wx.showToast({
                title: '添加日程成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail(res) {
              console.log(res) // 日程添加失败的回调函数
              wx.showToast({
                title: '添加日程失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
</script>

<style lang="scss" scoped></style>
