<template>
  <view>
    <!-- 专辑背景 -->
    <view class="album_bg">
      <image mode="wdithFill" :src="album.cover" alt />
      <view class="album_info">
        <view class="album_text">{{album.name}}</view>
        <view class="album_btn">关注专辑</view>
      </view>
    </view>

    <!-- 专辑作者 -->
    <view class="album_author">
      <view class="album_title">
        <image mode="aspectFill" :src="album.user.avatar" alt />
        <view class="name">{{album.user.name}}</view>
      </view>
      <view class="album_content">
        <text>{{album.desc}}</text>
      </view>
    </view>

    <!-- 图片列表 -->
    <view class="album_list">
      <view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
        <goDetail :list="wallpaper" :index="index">
        <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>', '360')" alt />
        </goDetail>
      </view>
    </view>
  </view>
</template> 

<script>
import goDetail from "../components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      // 专辑页面查询参数
      queryParams: {
        limit: 12,
        order: "new",
        skip: 0,
        // 如果为 0 不请求 wallpaper
        first: 1
      },
      // 列表页传递过来的id值
      id: "-1",
      // 文章详情数据
      album: {},
      // 图片列表
      wallpaper: []
    };
  },
  onLoad(options) {
    // 获取传递的参数
    console.log(options.id);
    this.id = options.id;
    this.getData();
  },
  methods: {
    // 获取接口数据
    getData() {
      this.$request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.queryParams
      }).then(res => {
        if (res.data.res.wallpaper.length === 0) {
          this.queryParams.first = 0;
        }
        console.log(res.data);
        this.album = res.data.res.album;
        this.wallpaper = [...this.wallpaper, ...res.data.res.wallpaper];
      });
    }
  },
  onReachBottom() {
    if (this.queryParams.first === 0) {
      return uni.showToast({
        title: "没有更多数据",
        icon: "none"
      });
    }
    this.queryParams.skip += this.queryParams.limit;
    this.getData();
  }
};
</script> 

<style lang="scss" scoped>
.album_bg {
  position: relative;
  image {
    width: 100%;
    vertical-align: top;
  }
  .album_info {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding-right: 20rpx;
    align-items: center;
    .album_text {
      padding: 20rpx 30rpx;
    }
    .album_btn {
      font-size: 28rpx;
      background-color: #f00;
      padding: 10rpx;
    }
  }
}
.album_author {
  padding: 20rpx;
  .album_title {
    display: flex;
    align-items: center;
    image {
      width: 100rpx;
      height: 100rpx;
    }
    .name {
      font-weight: 600;
    }
  }
  .album_content {
    padding: 20rpx 0;
    font-size: 28rpx;
  }
}
.album_list {
  display: flex;
  flex-wrap: wrap;
  .album_item {
    width: 33.33%;
    image {
      width: 100%;
      height: 160rpx;
      padding: 4rpx;
      vertical-align: top;
    }
  }
}
</style>