import Vue from 'vue'
import App from './App.vue'
// 导入组件库
import { FlyLine, AirLoading, RingChart, FlowChart, DashChart } from '../packages'
// 注册组件库
Vue.use(FlyLine)
Vue.use(AirLoading)
Vue.use(RingChart)
Vue.use(FlowChart)
Vue.use(DashChart)

// import specialUi from '../packages'
// Vue.use(specialUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
