import FlyLine from './src/main'

// 为组件提供 install 安装方法，供按需引入
FlyLine.install = function (Vue) {
  Vue.component(FlyLine.name, FlyLine)
}

// 默认导出组件
export default FlyLine