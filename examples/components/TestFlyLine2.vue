<template>
  <div class="container">
    <fly-line2 :width="1820" :height="900" :dataset="data" :config="config"></fly-line2>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      data: [
          {
              from: { x: 300, y: 300},
              to: { x: 700, y: 100},
              raduis: 0.5
          }, 
          {
              from: { x: 1200, y: 300},
              to: { x: 800, y: 100},
              raduis: 0.5
          }, 
          {
              from: { x: 1300, y: 100},
              to: { x: 1600, y: 300},
              raduis: -0.5
          }
      ],
      config: {
          //marker点半径
          // markerRadius: 2,
          //marker点颜色,为空或null则默认取线条颜色
          // markerColor: null,
          // 线条类型 solid、dashed; 有lineDash并且设值则dashed
          lineDash: [5, 4],
          //线条宽度
          lineWidth: 1,
          //线条颜色
          colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
          //移动点半径
          moveRadius: 3,
          //移动点颜色
          fillColor: '#fff',
          //移动点阴影颜色
          shadowColor: '#fff',
          //移动点阴影大小
          shadowBlur: 2
      }
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
</style>
