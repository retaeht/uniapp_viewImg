<template>
  <scroll-view v-if="recommend.length" @scrolltolower="handleTouchBottom" scroll-y="true" class="recom_scroll">
    <!-- 1.热门推荐 -->
    <view class="recom_wrap">
      <view class="recom_item" v-for="item in recommend" :key="item.id">
        <goDetail :index="index" :list="recommend">
          <image mode="widthFix" :src="item.thumb" alt />
        </goDetail>
      </view>
    </view>

    <!-- 2.月份 -->
    <view class="month_wrap">
      <view class="month_title">
        <view class="month_title_info">
          <view class="month_info">
            <text>{{monthData.DD}} /</text>
            {{monthData.MM}}月
          </view>
          <view class="month_text">{{monthData.title}}</view>
        </view>
        <view class="month_title_more">更多></view>
      </view>
      <view class="month_content">
        <view class="content_item" v-for="(item, index) in monthData.items" :key="item.id">
          <goDetail :index="index" :list="monthData.items">
            <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)" alt />
          </goDetail>
        </view>
      </view>
    </view>

    <!-- 3.更多热门 -->
    <view class="hot_wrap">
      <view class="hot_title">
        <view class="title_info">热门</view>
      </view>
      <view class="hot_content">
        <view class="content_item" v-for="(item,index) in hotData" :key="item.id">
          <!-- 组件 -->
          <goDetail :index="index" :list="hotData">
            <image mode="aspectFill" :src="item.thumb" alt />
          </goDetail>
        </view>
      </view>
    </view>
  </scroll-view>
</template> 

<script>
// 时间格式化插件
import moment from "moment";
import goDetail from "../../components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      // 推荐页面查询参数
      queryParams: {
        limit: 6,
        order: "hot",
        skip: 0
      },
      // 首页推荐数据
      recommend: [],
      // 月份推荐数据
      monthData: {},
      // 更多热门推荐
      hotData: [],
      // 是否有更多数据
      hasData: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取推荐页数据
    getData() {
      this.$request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.queryParams
      }).then(res => {
        // 如果有数据 则只更新更多热门推荐数据
        if (this.recommend.length === 0) {
          // 获取热门推荐
          this.recommend = res.data.res.homepage[1].items;
          // 获取月份推荐数据
          this.monthData = res.data.res.homepage[2];
          // 添加日期
          this.monthData.MM = moment(this.monthData.stime).format("MM");
          this.monthData.DD = moment(this.monthData.stime).format("DD");
          console.log(this.monthData);
        }
        if (res.data.res.vertical.length === 0) {
          this.hasData = false;
          return;
        }
        // 获取更多热门推荐数据
        this.hotData = [...this.hotData, ...res.data.res.vertical];
        console.log("this.hotData", this.hotData);
        console.log("this.recommend", this.recommend);
      });
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
      }
    }
  }
};
</script> 

<style  lang='scss' scoped>
.recom_scroll {
  height: calc(100vh - 36px);
}
.recom_wrap {
  overflow: hidden;
  .recom_item {
    width: 50%;
    border: 3rpx solid #fff;
    float: left;
    image {
      width: 100%;
      vertical-align: top;
    }
  }
}
.month_wrap {
  .month_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    .month_title_info {
      display: flex;
      align-items: center;
      .month_info {
        color: $themeColor;
        font-weight: 600;
        font-size: 32rpx;
        text {
          font-size: 36rpx;
        }
        padding-right: 10rpx;
      }
    }
    .month_title_more {
      color: $themeColor;
      font-size: 28rpx;
    }
  }
  .month_content {
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