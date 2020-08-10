import FlashMarker from './src/main'

FlashMarker.install = function (Vue) {
  Vue.component(FlashMarker.name, FlashMarker)
}

export default FlashMarker