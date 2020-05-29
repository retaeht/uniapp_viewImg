<template>
  <scroll-view @scrolltolower="handleTouchBottom" scroll-y="true" class="video_main">
    <view class="video_main_wrap">
      <view class="video_main_content">
        <view @click="handleClick(item)" class="content_item" v-for="item in data" :key="item.id">
            <image mode="aspectFill" :src="item.img" alt />
        </view>
      </view>
    </view>
  </scroll-view>
</template>
  
<script>
export default {
  props: {
    obj: Object
  },
  data() {
    return {
      data: [],
      hasData: true
    }
  },
  mounted() {
    console.log(this.obj);
    this.getData();
  },
  watch: {
    obj() {
      console.log(this.obj);
      this.hasData = true
      this.data = []
      this.getData();
    }
  },
  methods: {
    async getData() {
      const res = await this.$request({
        url: this.obj.url,
        data: this.obj.params
      });
      if(res.data.res.videowp.length === 0) {
        this.hasData = false
        return this.obj.params.skip = 0
      }
      console.log(res.data);
      this.data = [...this.data,...res.data.res.videowp]
    },
    handleTouchBottom () {
      if (this.hasData) {
        this.obj.params.skip += this.obj.params.limit;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
      }
    },
    handleClick(item) {
      getApp().globalData.video = item
      uni.navigateTo({url: '/pages/videoPlay/index'})
    }
  }
};
</script>

<style lang="scss" scoped>
.video_main {
  height: calc(100vh - 36px);
  .video_main_wrap {
    .video_main_title {
      padding: 20rpx;
      .title_info {
        font-size: 32rpx;
        font-weight: 600;
        border-left: 16rpx solid $themeColor;
        padding-left: 12rpx;
      }
    }
    .video_main_content {
      display: flex;
      flex-wrap: wrap;
      .content_item {
        width: 33.33%;
        image {
          width: 100%;
          height: 360rpx;
          padding: 3rpx;
          vertical-align: top;
        }
      }
    }
  }
}
</style>