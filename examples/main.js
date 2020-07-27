import Vue from 'vue'
import App from './App.vue'
// 导入组件库
import { FlyLine } from '../packages'
// 注册组件库
Vue.use(FlyLine)

// import specialUi from '../packages'
// Vue.use(specialUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
