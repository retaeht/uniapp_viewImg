<template>
  <view>
    <!-- 1.作者信息 -->
    <view v-if="imgData.length" class="author_info">
      <view class="author_photo">
        <image mode="aspectFill" :src="imgData.user.avatar" alt />
      </view>
      <view class="author_desc">
        <view class="authot_name">{{imgData.user.name}}</view>
        <view class="authot_time">{{imgData.cntime}}</view>
      </view>
    </view>

    <!-- 2.高清大图 -->
    <!-- 左右滑动组件 -->
    <swiperAction @swiperAction="handleSwiper">
      <view class="high_img">
        <image mode="widthFix" :src="imgData.thumb" alt />
        <view class="tool">
          <view class="dianzan">
            <text class="iconfont icon-runtongyiyaoyihuifu_dianzan">点赞</text>
          </view>
          <view class="shoucang">
            <text class="iconfont icon-shoucang1">收藏</text>
          </view>
        </view>
      </view>
    </swiperAction>

    <!-- 3.下载按钮 -->
    <view class="download">
      <view @click="handleDownload" class="btn">下载图片</view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
import swiperAction from "../components/swiperAction";
export default {
  components: {
    swiperAction
  },
  data() {
    return {
      // 图片信息
      imgData: {
        url: "",
        cntime: ""
      },
      // 当前图片详情索引
      imgIndex: 0,
      imgList: []
    };
  },
  onLoad() {
    console.log(getApp().globalData);
    let { imgList, imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.imgList = imgList;
    this.getImgList();
    this.getComment();
  },
  methods: {
    getImgList() {
      // 获取全局图片列表数据
      this.imgData = this.imgList[this.imgIndex];
      // this.imgData.url =
      //   this.imgData.thumb + this.imgData.rule.replace("$<Height>", 360);
      // 格式化时间
      this.imgData.cntime = moment(this.imgData.atime * 1000).fromNow();
    },
    // 获取评论数据 接口没数据了
    getComment() {
      this.$request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${this.imgData.id}/comment`
      }).then(res => console.log(res.data));
    },
    // 滑动组件 返回参数
    handleSwiper(e) {
      console.log(e === "left");
      console.log(this.imgIndex < this.imgList.length - 1);

      if (e === "left" && this.imgIndex < this.imgList.length - 1) {
        this.imgIndex += 1;
        console.log(this.imgIndex);
      } else if (e === "right" && this.imgIndex > 0) {
        this.imgIndex -= 1;
        console.log(this.imgIndex);
      } else {
        return uni.showToast({ title: "没有更多", icon: "none" });
      }
      this.getImgList();
    },
    // 下载图片
    async handleDownload() {
      // 调用小程序api 将图片下载到小程序内存 downloadFile
      // 再从内存中下载到本地 saveImageToPhotosAlbum
      const res = await uni.downloadFile({ url: this.imgData.img })
      const {tempFilePath} = res[1]
      const res2 = await uni.saveImageToPhotosAlbum({filePath: tempFilePath})
    }
  }
};
</script>

<style lang="scss" scoped>
.author_info {
  padding: 40rpx;
  display: flex;
  .author_photo {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .author_desc {
    padding-left: 30rpx;

    .authot_name {
      font-size: 28rpx;
      font-weight: 600;
      padding-block: 10rpx;
    }
    .authot_time {
      font-size: 24rpx;
      color: #ccc;
    }
  }
}
.high_img {
  image {
    width: 100%;
  }
  .tool {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80rpx;
    border-bottom: 2rpx solid #f2f2f2;
  }
}
.download {
  padding-top: 30rpx;
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    width: 90%;
    height: 80%;
    background-color: $themeColor;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
</style>