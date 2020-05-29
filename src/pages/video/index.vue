<template>
  <view>
    <view class="video_tab">
      <view class="video_title">
        <view class="video_inner">
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
      <view class="video_tab_content">
        <view class="content">
          <view v-if="current <4">
            <videoMain :obj="{url:items[current].url,params:items[current].params}"></videoMain>
          </view>
          <view v-if="current === 4">
            <videoCate :obj="{url:items[current].url,params:items[current].params}"></videoCate>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import videoMain from "./video-main/index";
import videoCate from "./video-cate/index";
export default {
  components: {
    uniSegmentedControl,
    videoCate,
    videoMain
  },
  data() {
    return {
      items: [
        {
          title: "推荐",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
          params: { limit: 12, skip: 0, order: "hot" }
        },
        {
          title: "娱乐",
          url:
            "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
          params: { limit: 12, skip: 0, order: "new" }
        },
        {
          title: "最新",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
          params: { limit: 12, skip: 0, order: "new" }
        },
        {
          title: "热门",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
          params: { limit: 12, skip: 0, order: "hot" }
        },
        {
          title: "分类",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
          params: { limit: 12, skip: 0, order: "hot" }
        }
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
  }
};
</script> 

<style lang="scss">
.video_tab {
  .video_title {
    position: relative;
    .video_inner {
      width: 70%;
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