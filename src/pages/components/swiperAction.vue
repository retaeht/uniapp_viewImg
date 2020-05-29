<template>
  <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 图片信息
      imgData: {},
      // 记录手指触摸的坐标和时间
      touchStart: {
        x: "",
        y: "",
        time: ""
      }
    };
  },
  methods: {
    handleTouchStart(e) {
      this.touchStart.x = e.changedTouches[0].clientX;
      this.touchStart.y = e.changedTouches[0].clientY;
      this.touchStart.time = Date.now();
    },
    handleTouchEnd(e) {
      const x = e.changedTouches[0].clientX;
      const y = e.changedTouches[0].clientY;
      const time = Date.now();
      // 判断手指停留时间是否合法
      const oldTime = this.touchStart.time;
      if (oldTime - time > 2000) {
        return;
      }
      // 判断滑动距离是否合法
      let directive = "";
      if (Math.abs(x - this.touchStart.x) > 10&& Math.abs(y - this.touchStart.y)<10) {
        directive = x - this.touchStart.x > 0 ? "right" : "left";
        // console.log(directive);
        this.$emit('swiperAction', directive)
      } else {
        return;
      }
    }
  }
};
</script>

<style>
</style>