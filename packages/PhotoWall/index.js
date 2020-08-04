import PhotoWall from './src/main'

PhotoWall.install = function (Vue) {
  Vue.component(PhotoWall.name, PhotoWall)
}

export default PhotoWall