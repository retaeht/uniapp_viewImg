接口文档：https://www.showdoc.cc/414855720281749?page_id=3680857125411215vz

### 项目介绍

提供视频和图片预览和下载的小程序

![1590712752248](C:\Users\olive\AppData\Roaming\Typora\typora-user-images\1590712752248.png)



### 用到技术

uniapp框架 cli脚手架

moment.js时间格式化插件

uniui：分段器

uniapi:  全局数据共享getApp().globalData.url，图片下载

生命周期函数：页面的onLoad onShow、组件的mouted、watched

组件封装：

- 超链接组件
- 手势滑动组件

请求封装

iconfont字体库

组件间的传值

scss扩展语言

上拉刷新两种方式：

- scroll-view组件提供的api @scrolltolower
- onReachBottom 生命周期函数

### 项目构建

#### 2.1项目构建

通过vue-cli创建项目  vue create -p dcloudio/uni-preset-vue dnpicture

安装 sass依赖：   npm install  sass-loader node-sass

- ​	 支持小程序的rpx 和 h5的vw、vh

   	内置有sass的配置了，只需要 安装对应的依赖即可  “  npm install sass-loader node-sass ”

   	vue组件中，在 style 标签上 加入 属性 “ <style lang='scss' >   ”  即可

#### 2.2项目结构

新增tabbar页面

| **页面名称** | **路径**             |
| ------------ | -------------------- |
| 首页         | home/index.vue       |
| 横屏         | horizontal/index.vue |
| 精美视频     | video/index.vue      |
| 搜索         | search/index.vue     |
| 我的         | mine/index.vue       |

````javascript
// 在page.json中的tabBar节点添加页面路径
"tabBar": {
		"color": "#999",
		"selectedColor": "#ff2d4a",
		"backgroundColor": "",
		"position": "bottom",
		"borderStyle": "black",
		"list": [
			{
				"pagePath": "pages/home/index",
				"text": "首页",
				"iconPath": "static/icons/home.png",
				"selectedIconPath": "static/icons/home-o.png"
			}
		]
	},
````

#### 2.3引入字体图标

- 新建styles文件

- 在 App.vue中 全局引入样式文件

### 首页模块

#### 1功能分析

-   修改导航栏的外观

-   使用 分段器组件 搭建子页面

-   封装异步请求

#### 2.搭建子页面

- 首页模块分为 4个子组件，分别是 推荐、分类、最新、专辑

-  新建自定义组件来代替 上述的4个页面
- 使用 setNavigationBarTitle（{title: 'xxx'}） 修改 组件页面标题
  -  home-recommend/index.vue
  -  home-category/index.vue
  -  home-new/index.vue
  -  home-album/index.vue

#### 3分段器介绍

分段器指的是 uni-ui 中的一个组件，分段器实现 标签页，tab栏 的跳转

安装：npm install @dcloudio/uni-ui

````javascript
// 1.引入组件
import { uniSegmentedControl } from "@dcloudio/uni-ui";

// 2. 注册组件
components: {uniSegmentedControl}

// 3.在templete中使用
<uni-segmented-control 
    :current="current" 
    :values="items" 
    @clickItem="onClickItem" 
    style-type="text" 
    active-color="#4cd964">
</uni-segmented-control>
<view class="content">
    <view v-show="current === 0">选项卡1的内容</view>
    <view v-show="current === 1">选项卡2的内容</view>
</view>
<script>
  onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
   }
</script>
````

#### 4.封装异步请求

对请求自定义功能

- 在utils文件下新建request.js
- export.default 导出封装的函数

- 在mian.js中引入，挂载到Vue的原型上，供全局使用
- 通过 this.$request 的方式来使用

### 首页-推荐模块

#### 1.数据动态渲染

#### 2.moment.js时间格式化插件：

http://momentjs.cn/

- npm i moment
- 组件中引入：import moment from "moment";

#### 3.基于scroll-view的分页加载

​	使用 scroll-view 标签充当分页的容器

````javascript
<scroll-view 
	@scrolltolower="handleTouchBottom" // 绑定触底事件
	scroll-y="true" // 纵向滚动
	class="recom_scroll" // 为组件添加高度
>
````

### 首页-专辑列表

-  使用 swiper 轮播图组件

-  使用 scroll-view 组件实现分页

-  点击跳转到 专辑详情页

### 专辑详情

#### onReachBottom

 使用 onReachBottom 生命周期函数触发 上拉加载下一页 

### 首页-图片详情

-  封装 超链接组件

-  使用 moment.js 处理特殊时间格式(xxx天前)

-  封装 手势滑动组件

-  下载图片api

#### 1.封装超链接组件 goDetail

- 能够缓存图片详情页面需要滑动的图片数组和图片索引 
- 跳转到图片详情页面

#### 2.moment.js 处理时间格式

````javascript
1.moment.locale(“zh-cn”)
2.fromNow()
````

#### 3.封装手势滑动组件swiperAction

- 实现插槽slot功能
- 向父组件传递 滑动的方向

封装思路：

- 手指在容器上产生了移动 
- 手指在容器上滑动的时间不能太长

- 根据坐标判断滑动的方向

````javascript
// 1.为容器事件 touchstart、touchend事件
handleTouchStart(e) {
    // 2.记录按下的横纵坐标和时间
  this.touchStart.x = e.changedTouches[0].clientX;
  this.touchStart.y = e.changedTouches[0].clientY;
  this.touchStart.time = Date.now();
},
handleTouchEnd(e) {
      const x = e.changedTouches[0].clientX;
      const y = e.changedTouches[0].clientY;
      const time = Date.now();
      // 判断手指停留时间是否合法
      const oldTime = this.touchStart.time;
      if (oldTime - time > 2000) {
        return;
      }
      // 判断滑动距离是否合法
      let directive = "";
      if (Math.abs(x - this.touchStart.x) > 10&& Math.abs(y - this.touchStart.y)<10) {
        directive = x - this.touchStart.x > 0 ? "right" : "left";
        // console.log(directive);
        this.$emit('swiperAction', directive)
      } else {
        return;
      }
    }
````

#### 4.下载图片到本地api

- downloadFile  下载远程文件到小程序的内存中
- saveImageToPhotosAlbum  将 图片从内存中下载到本地

````javascript
const res = await uni.downloadFile({ url: this.imgData.img })
const {tempFilePath} = res[1]
const res2 = await uni.saveImageToPhotosAlbum({filePath: tempFilePath})
````

### 首页-分类

- 分段器的使用
- 
  判断current 请求不同数据

- scroll-view 上拉刷新

- 跳转到图片详情页面

### 视频模块

有推荐、热门、最新、娱乐模块

#### 1.发送请求获取数据

- tab栏中子页面结构一样，所以共用组件
- 将每一个页面的接口地址和接口参数都封装到标题数组中，点击标题的时候，也传递对应的接口路径和参数给内容组件
- mounted只能调用一次，需要在组件中使用 “watch” 来监控接收的参数发生了变化

#### 2.视频播放模块

- video 标签的 muted 属性实现声音的开关
- video标签中添加 objectFix="fill"
- css背景模糊用到c3的 fliter：blur(10px)
- button 的 open-type 设置为 share 实现转发


将每一个页面的接口地址和接口参数都封装到标题数组中

点击标题的时候，也传递对应的接口路径和参数给内容组件

需要在组件中使用 “watch” 来监控接收的参数发生了变化

内容组件接收参数，发送请求渲染页面

