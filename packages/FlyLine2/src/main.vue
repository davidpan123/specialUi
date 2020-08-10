<template>
   <div id="fly-line2-container" :style="{width: width + 'px', height: height + 'px', 'z-index': zIndex}">
       <canvas id="myCanvas" :width="width" :height="height" :style="{width: width + 'px', height: height + 'px'}" ></canvas>
       <canvas id="myCanvas2" :width="width" :height="height" :style="{width: width + 'px', height: height + 'px'}"></canvas>
   </div>
</template>
 
<script>
import MoveLine from './moveLine'
export default {
    name: 'FlyLine2',
    props: {
        dataset: {
            type: Array,
            default: () => []
        },
        config: {
            type: Object,
            default: () => {
                return {}
            }
        },
        width: {
            type: Number,
            default: 0,
            required: true
        },
        height: {
            type: Number,
            default: 0,
            required: true
        },
        zIndex: {
            type: Number,
            default: 0
        }
    },
    mounted () {
        let c = document.getElementById('myCanvas')
        let ctx= c.getContext('2d')
        let c2 = document.getElementById('myCanvas2')
        let ctx2= c2.getContext('2d')
        new MoveLine(ctx, ctx2, {
            //marker点半径
            markerRadius: this.config.markerRadius || 3,
            //marker点颜色,为空或null则默认取线条颜色
            markerColor: this.config.markerColor || null,
            lineDash: this.config.lineDash || [],
            //线条宽度
            lineWidth: this.config.lineWidth || 1,
            //线条颜色
            colors: this.config.colors || [],
            //移动点半径
            moveRadius: this.config.moveRadius || 2,
            //移动点颜色
            fillColor: this.config.fillColor || '#fff',
            //移动点阴影颜色
            shadowColor: this.config.shadowColor || '#fff',
            //移动点阴影大小
            shadowBlur: this.config.shadowBlur || 5,
            data: this.dataset
        })
    },
    methods: {
    }
}
</script>
 
<style lang="scss" scoped>
#fly-line2-container {
    position: relative;
    overflow: hidden;
    background-color: #333;
}
#myCanvas, #myCanvas2 {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
}
</style>
