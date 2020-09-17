<template>
  <div class="container">
    <bessel-arc-flyline :width="1820" :height="900" :dataset="data" :config="config"></bessel-arc-flyline>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      data: [
          {
              from: { x: 1700, y: 300},
              to: { x: 1500, y: 500},
              end: { x: 1000, y: 300},
              r: 200,
              firstControlFactor: -0.5,
              secondControlFactor: 0.1,
              speedBezierFactor: 8000,
              speedArcFactor: 200,
              startArcAngle: -Math.PI / 2,
              endArcAngle: Math.PI * 1.8,
              counterclockwise: true
          },
          {
              from: { x: 100, y: 300},
              to: { x: 600, y: 500},
              end: { x: 800, y: 300},
              r: 200,
              firstControlFactor: -0.5,
              secondControlFactor: 0.1,
              speedBezierFactor: 8000,
              speedArcFactor: 200,
              startArcAngle: -Math.PI / 2,
              endArcAngle: Math.PI * 3 / 2.6
          },
          // {
          //     from: { x: 100, y: 200},
          //     to: { x: 600, y: 500},
          //     end: { x: 800, y: 300},
          //     r: 210,
          //     firstControlFactor: -0.5,
          //     secondControlFactor: 0.1,
          //     speedBezierFactor: 8000,
          //     speedArcFactor: 200,
          //     startArcAngle: -Math.PI / 2,
          //     endArcAngle: Math.PI * 3 / 2.6
          // }
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
          moveRadius: 2,
          //移动点颜色
          fillColor: '#fff',
          //移动点阴影颜色
          shadowColor: '#fff',
          //移动点阴影大小
          shadowBlur: 1
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
