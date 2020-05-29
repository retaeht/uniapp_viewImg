<template>
  <view>5</view>
</template>

<script>
export default {
  props: {
    obj: Object
  },
  mounted() {
    console.log(this.obj);
    this.getData()
  },
  methods: {
  //   async getData() {
  //     const res = await this.$request({
  //       url: this.obj.url,
  //       data: this.obj.params
  //     });
  //     console.log(res.data);
  //   }
  }
};
</script>

<style>
</style>