import Vue from 'vue'
import App from './App.vue'
// 导入组件库
import { FlyLine, FlyLine2, AirLoading, RingChart, FlowChart, DashChart, DashRatioChart, FlashMarker,
  GradientDashChart, BesselArcFlyline, GradientDashProgress } from '../packages'
// 注册组件库
Vue.use(FlyLine)
Vue.use(AirLoading)
Vue.use(RingChart)
Vue.use(FlowChart)
Vue.use(DashChart)
Vue.use(DashRatioChart)
Vue.use(FlashMarker)
Vue.use(FlyLine2)
Vue.use(GradientDashChart)
Vue.use(BesselArcFlyline)
Vue.use(GradientDashProgress)

// import specialUi from '../packages'
// Vue.use(specialUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
