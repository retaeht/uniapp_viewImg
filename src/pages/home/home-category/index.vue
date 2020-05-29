<template>
  <view class="home_cate">
    <navigator :url="`/pages/imgCate/index?id=${item.id}`" class="cate_item" v-for="item in cate" :key="item.id">
        <image mode="widthFix" :src="item.cover" alt />
      <view class="cate_name">{{item.rname}}</view>
    </navigator>
  </view>
</template> 

<script>
export default {
  mounted() {
    // 标题 api
    uni.setNavigationBarTitle({
      title: "分类"
    });
    // 分类数据
    this.getData();
  },
  data() {
    return {
      // 分类数据
      cate: []
    };
  },
  methods: {
    // 获取分类接口
    async getData() {
      const { data } = await this.$request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category"
      });
      console.log(data);
      this.cate = data.res.category;
    }
  }
};
</script> 

<style lang="scss" scoped>
.home_cate {
  .cate_item {
    width: 33.33%;
    float: left;
    position: relative;
    image {
      padding: 3rpx;
      width: 100%;
    }
    .cate_name {
      color: #fff;
      bottom: 12rpx;
      left: 30rpx;
      position: absolute;
    }
  }
}


</style>