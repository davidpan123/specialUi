import DashChart from './src/main'

DashChart.install = function (Vue) {
  Vue.component(DashChart.name, DashChart)
}

export default DashChart