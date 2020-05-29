<template>
  <view>
    <view class="imgCate_tab">
      <view class="imgCate_title">
        <view class="imgCate_inner">
          <uni-segmented-control
            :current="current"
            :values="items.map(v=>v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#dd524d"
          ></uni-segmented-control>
        </view>
        <text class="iconfont icon-runtongyiyaoyihuifu_sousuo"></text>
      </view>
      <scroll-view @scrolltolower="handleTouchBottom" scroll-y="true" class="imgCate_tab_content">
        <view class="content">
          <view class="hot_wrap">
            <view class="hot_content">
              <view class="content_item" v-for="(item,index) in data" :key="item.id">
                <!-- 组件 -->
                <goDetail :index="index" :list="data">
                  <image mode="aspectFill" :src="item.thumb" alt />
                </goDetail>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import goDetail from "../components/goDetail";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    uniSegmentedControl,
    goDetail
  },
  onLoad(options) {
    console.log(options);
    this.id = options.id;
    this.getData();
  },
  data() {
    return {
      queryParams: {
        limit: 12,
        order: "new",
        skip: 0
      },
      items: [{ title: "最新" }, { title: "热门" }],
      current: 0,
      id: "",
      data: [],
      hasData: true
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
        this.queryParams.order =
        this.queryParams.order === "new" ? "hot" : "new";
        console.log(this.queryParams.order)
        this.queryParams.skip = 0;
        this.data = [];
        this.hasData = true
        this.getData();
      }
    },
    async getData() {
      const res = await this.$request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.queryParams
      });
      console.log(res.data.res.vertical);
      console.log(res.data.res.vertical.length);
      if (res.data.res.vertical.length === 0) {
        this.hasData = false;
        return;
      }
      console.log(res.data);
      this.data = [...this.data, ...res.data.res.vertical];
    },
    // 触底加载数据
    handleTouchBottom() {
      if (this.hasData) {
        this.queryParams.skip += this.queryParams.limit;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
        return 
      }
    }
  }
};
</script>

<style lang="scss">
.imgCate_tab {
  .imgCate_title {
    position: relative;
    .imgCate_inner {
      width: 60%;
      margin: 0 auto;
    }
    .icon-runtongyiyaoyihuifu_sousuo {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20rpx;
    }
  }
}
.hot_wrap {
  .hot_title {
    padding: 20rpx;
    .title_info {
      font-size: 32rpx;
      font-weight: 600;
      border-left: 16rpx solid $themeColor;
      padding-left: 12rpx;
    }
  }
  .hot_content {
    height: calc(100vh - 36px);
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
</style>