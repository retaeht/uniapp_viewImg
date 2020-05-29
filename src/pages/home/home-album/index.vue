<template>
  <scroll-view scroll-y="true" @scrolltolower="handleTouchBottom" class="album_srcoll">
    <!-- 1.轮播图 -->
    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image mode="widthFix" :src="item.thumb" alt />
        </swiper-item>
      </swiper>
    </view>
    <!-- 2.推荐列表 -->
    <view class="album_list">
      <navigator :url="`/pages/album/index?id=${item.id}`" class="album_item" v-for="item in albumData" :key="item.id">
        <view class="album_img">
          <image mode="aspectFill" :src="item.cover" alt />
        </view>
        <view class="album_info">
          <view class="album_name">{{item.name}}</view>
          <view class="album_desc">{{item.desc}}</view>
          <view class="album_btn">
            <text>+关注</text>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template> 

<script>
export default {
  data() {
    return {
      // 专辑页面查询参数
      queryParams: {
        limit: 12,
        order: "new",
        skip: 0
      },
      // 轮播图数据
      banner: [],
      // 专辑数据
      albumData: []
    };
  },
  mounted() {
    // 设置导航标题
    uni.setNavigationBarTitle({
      title: "专辑"
    });
    console.log("12");
    this.getData();
  },
  methods: {
    // 获取接口数据
    getData() {
      console.log("1");
      this.$request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.queryParams
      })
        .then(res => {
          console.log(res.data);
          this.banner = res.data.res.banner;
          this.albumData = res.data.res.album;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上拉触底事件
    handleTouchBottom() {
      
    }
  }
};
</script> 

<style lang="scss" scoped>
.album_srcoll {
  height: calc(100vh - 36px);
}
.album_swiper {
  swiper {
    height: calc(100vw / 640 * 284);
    image {
      width: 100%;
    }
  }
}
.album_list {
  .album_item {
    padding: 20rpx 10rpx;
    display: flex;
    border-bottom: 2px solid #f2f2f2;
    .album_img {
      flex: 1;
      image {
        width: 200rpx;
        height: 200rpx;
        vertical-align: top;
      }
    }
    .album_info {
      flex: 2;
      overflow: hidden;
      .album_name {
        font-size: 32rpx;
        padding-left: 20rpx;
      }
      .album_desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 20rpx;
        font-size: 28rpx;
      }
      .album_btn {
        text-align: right;
        padding: 40rpx 20rpx 0 0;
        text {
          border: 4rpx solid $themeColor;
          font-size: 32rpx;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>