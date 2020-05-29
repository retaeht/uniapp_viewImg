<template>
  <view class="videoPlay_wrap">
    <image :src="data.img" alt />

    <view class="video_tool">
      <view @click="handleMuted" :class="['iconfont', muted?'icon-jingyin':'icon-shengyin']"></view>
      <view class="iconfont icon-zhuanfa">
        <button open-type="share"></button>
      </view>
    </view>

    <view class="video_wrap">
      <video :src="data.video" objectFit="fill"></video>
    </view>
    <view class="video_download">
      <view class="btn" @click="handleDownload">下载高清</view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {
    this.data = getApp().globalData.video;
  },
  data() {
    return {
      data: [],
      muted: false
    };
  },
  methods: {
    handleMuted() {
      this.muted = !this.muted;
      console.log(this.data.video);
      console.log(this.muted);
    },
    async handleDownload() {
      const { tempFilePath } = (
        await uni.downloadFile({ url: this.data.video })
      )[1];
      await uni.saveVideoToPhotosAlbum({ filePath: tempFilePath });
    }
  }
};
</script>

<style lang="scss" scoped>
.videoPlay_wrap {
  position: relative;
  height: 100vh;
  width: 100vw;
  .video_tool {
    height: 88rpx;
    display: flex;
    justify-content: flex-end;
    .iconfont {
      width: 88rpx;
      height: 88rpx;
      margin-right: 20rpx;
      border-radius: 44rpx;
      font-size: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
    }
    .icon-zhuanfa {
      position: relative;
      button {
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }

  image {
    height: 100%;
    width: 100%;
    filter: blur(10rpx);
    float: left;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
  }

  .video_wrap {
    display: flex;
    justify-content: center;
    video {
      width: 300rpx;
      height: 600rpx;
    }
  }

  .video_download {
    padding-top: 30rpx;
    .btn {
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid #fff;
      color: #fff;
      width: 600rpx;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
      margin: 0 auto;
      // border-radius: 40rpx;
    }
  }
}
</style>