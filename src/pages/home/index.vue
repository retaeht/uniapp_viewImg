<template>
  <view>
    <view class="home_tab">
      <view class="home_title">
        <view class="home_inner">
          <uni-segmented-control
            :current="current"
            :values="items.map(v=>v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#dd524d"
          ></uni-segmented-control>
        </view>
        <text class="iconfont icon-runtongyiyaoyihuifu_sousuo">
        </text>
      </view>
      <view class="home_tab_content">
        <view class="content">
          <view v-if="current === 0">
            <homeRecommend></homeRecommend>
          </view>
          <view v-if="current === 1">
            <homeCategory></homeCategory>
          </view>
          <view v-if="current === 2">
            <homeNew></homeNew>
          </view>
          <view v-if="current === 3">
            <homeAlbum></homeAlbum>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from "./home-album";
import homeNew from "./home-new";
import homeRecommend from "./home-recommend";
import homeCategory from "./home-category";
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  components: {
    homeAlbum,
    homeNew,
    homeRecommend,
    homeCategory,
    uniSegmentedControl
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" }
      ],
      current: 0
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  },
  onLoad() {
    
  }
};
</script>

<style lang="scss">
.home_tab {
  .home_title {
    position: relative;
    .home_inner {
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
</style>