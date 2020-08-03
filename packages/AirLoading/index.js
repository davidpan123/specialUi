import AirLoading from './src/main'

// 为组件提供 install 安装方法，供按需引入
AirLoading.install = function (Vue) {
  Vue.component(AirLoading.name, AirLoading)
}

// 默认导出组件
export default AirLoading