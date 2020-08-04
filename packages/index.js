import FlyLine from './FlyLIne/index.js'
import AirLoading from './AirLoading/index.js'
import RingChart from './RingChart/index.js'
import FlowChart from './FlowChart/index.js'
import DashChart from './DashChart/index.js'
// import PhotoWall from './PhotoWall/index.js'
// 存储组件列表
const components = [
  FlyLine,
  AirLoading,
  RingChart,
  FlowChart,
  DashChart
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 遍历注册全局组件
  components.forEach(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


export {
  install,
  FlyLine,
  AirLoading,
  RingChart,
  FlowChart,
  DashChart
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  FlyLine,
  AirLoading,
  RingChart,
  FlowChart,
  DashChart
}
