<template>
    <div id="flashMarker" :style="{width: width + 'px', height: height + 'px', 'z-index': zIndex}">
        <canvas id="myCanvas" :width="width" :height="height"  @click="handleClick"></canvas>
    </div>
</template>
 
<script>
import FlashMarker from './flashMarker'
export default {
    name: 'FlashMarker',
    props: {
        dataset: {
            type: Array,
            default: []
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
    created () {
        this.init()
    },
    mounted () {
        let c = document.getElementById('myCanvas')
        let ctx= c.getContext('2d')
        this.ctx = ctx
        new FlashMarker(ctx, this.dataset)
    },
    methods: {
        init () {
            this.indexArr = []
            this.dataset.forEach(item => {
                this.indexArr.push(this.getPositionBorder(item.position, item.type, item.max))
            })
        },
        getPositionBorder (center, type ='circle',  r = 20) {
            if (type === 'circle') {
                return {
                    left: center.x - r,
                    right: center.x + r,
                    top: center.y - r,
                    bottom: center.y + r
                }
            } else {
                let w = r
                let h = r / 2
                let kappa = 0.5522848
                // control point offset horizontal
                let ox = w / 2 * kappa
                // control point offset vertical
                let oy = h / 2 * kappa
                return {
                    left: center.x - ox,
                    right: center.x + ox,
                    top: center.y - oy,
                    bottom: center.y + oy
                }
            }
        },
        getEventPosition (ev) {
            var x, y
            if (ev.layerX || ev.layerX == 0) {
                x = ev.layerX
                y = ev.layerY
            } else if (ev.offsetX || ev.offsetX == 0) {
                x = ev.offsetX
                y = ev.offsetY
            }
            return { x: x, y: y }
        },
        handleClick (e) {
            let p = this.getEventPosition(e)
            let index = this.indexArr.findIndex(item => {
                return p.x >= item.left && p.x <= item.right && p.y >= item.top && p.y <= item.bottom
            })
            
            this.$emit('clickIndex', index)
        }
    }
}
</script>
 
<style lang="scss" scoped>
#flashMarker {
    position: relative;
}
#myCanvas {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
