import FlowChart from './src/main'

FlowChart.install = function (Vue) {
  Vue.component(FlowChart.name, FlowChart)
}

export default FlowChart