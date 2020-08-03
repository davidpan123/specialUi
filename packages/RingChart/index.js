import RingChart from './src/main'

RingChart.install = function (Vue) {
  Vue.component(RingChart.name, RingChart)
}

export default RingChart