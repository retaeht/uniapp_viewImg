// 数据缓存页 通过这个页面将首页需要使用的数据进行缓存，在跳转到目标页
<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number
  },
  methods: {
    handleClick() {
      getApp().globalData.imgList = this.list
      getApp().globalData.imgIndex = this.index
      uni.navigateTo({
        url: '/pages/imgDetail/index'
      })
    }
  }
};
</script>

<style>
</style>