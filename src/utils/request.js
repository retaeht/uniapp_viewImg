export default (params) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '加载中'
    })
    uni.request({
      ...params,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => { reject(err) },
      complete: () => {
        uni.hideLoading();
      }
    })
  })
}