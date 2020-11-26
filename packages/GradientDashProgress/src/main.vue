<template>
<div class="histogram" :id="id" :style="{'width': `${width}px`, 'height': `${height}px`}">
    <svg></svg>
</div>
</template>

<script>
import * as d3 from 'd3'
export default {
    name: 'GradientDashProgress',
    props: {
        total: {
            type: Number,
            default: 0
        },
        num: {
            type: Number,
            default: 0
        },
        bacColor: {
            type: String,
            default: () => '#244971'
        },
        formColor: {
            type: String,
            default: () => '#45C1FC'
        },
        toColor: {
            type: String,
            default: () => '#FFC466'
        },
        dash: {
            type: Array,
            default: () => {
                return [5, 20, 3]
            }
        },
        width: {
            type: Number,
            default: 600
        },
        raduis: {
            type: Number,
            default: 3
        },
        padding: {
            type: Object,
            default: () => {
                return {
                    left: 5,
                    right: 5
                }
            }
        }
    },
    data () {
        return {
            id: ''
        }
    },
    created () {
        this.id = this.uuid()
    },
    mounted () {
        // 无数据则直接返回，不执行绘图操作
        if (!this.total) return
        // 1.创建svg画布
        let width = document.getElementById(this.id).clientWidth
        let height = document.getElementById(this.id).clientHeight
        const svg = d3.select(this.$el).select('svg').attr('width', width).attr('height', height)
        // 2. 比例尺
        let xcale = d3.scaleLinear().domain([0, this.total]).range([0, width - this.padding.left - this.padding.right])
        // 3.绘制矩形
        // 设置矩形之间的间隙
        let dashWdith = 5
        let dashHeight = 20
        let dashSplit = 3
        if (this.dash.length === 3) {
            dashWdith = this.dash[0]
            dashHeight = this.dash[1]
            dashSplit = this.dash[2]
        }
        let g = svg.append('g').attr('transform', 'translate(' + this.padding.left + ',' + 0 + ')')
        let w = width - this.padding.left - this.padding.right
        g.selectAll('rect')
            .data(() => {
                let arr = []
                let x = 0
                arr.push(x)
                while (x < w) {
                    x = x + dashWdith + dashSplit
                    if (x <= w) {
                        arr.push(x)
                    }
                }

                return arr
            })
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return d
            })
            .attr('width', function(d) {
                return dashWdith
            })
            .attr('y', function(d){
                return 0
            })
            .attr('height', function(d){
                return dashHeight
            })
            .attr('rx', this.raduis)
            .attr('ry', this.raduis)
            .attr('fill',  (d, i) => {
                return this.getColor(d, i)
            })
    },
    methods: {
        uuid () {
            function s4 () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)
            }
            return (
                s4() + s4() + '-' + s4() + '-' + s4() +  '-' + s4() + '-' + s4() + s4() + s4()
            )
        },
        rgbToHex(r, g, b) {
            var hex = ((r<<16) | (g<<8) | b).toString(16);
            return '#' + new Array(Math.abs(hex.length-7)).join('0') + hex
        },
        hexToRgb(hex){
            let rgb = []
            for(let i = 1; i < 7; i += 2){
                rgb.push(parseInt("0x" + hex.slice(i, i+2)))
            }
            return rgb
        },
        getGradient (startColor, endColor, step){
            // 将 hex 转换为rgb
            let sColor = this.hexToRgb(startColor)
            let eColor = this.hexToRgb(endColor)

            // 计算R\G\B每一步的差值
            let rStep = (eColor[0] - sColor[0]) / step
            let gStep = (eColor[1] - sColor[1]) / step
            let bStep = (eColor[2] - sColor[2]) / step

            let gradientColorArr = []
            for(let i=0; i < step; i++){
                // 计算每一步的hex值
                gradientColorArr.push(this.rgbToHex(parseInt(rStep*i+sColor[0]),parseInt(gStep*i+sColor[1]),parseInt(bStep*i+sColor[2])))
            }
            return gradientColorArr
        },
        getColor (num, i) {
            let color = ''
            if (!this.realDatas.length) return color
            if (num <= this.realDatas[0]) {
                return this.num ? this.gradientColorArr[i] : this.bacColor
            } else if (num > this.realDatas[0] && num < this.realDatas[1]) {
                return this.bacColor
            }

            return color
        }
    },
    computed: {
        height () {
            if (this.dash.length === 3) {
                return this.dash[1]
            }

            return 20
        },
        realDatas () {
            if (!this.total) return []
            let start = 0
            let maxWidth = this.width - this.padding.left - this.padding.right
            let dataset = [this.num, this.total - this.num]
            let radius = maxWidth / this.total
            return dataset.map(item => {
                start += item * radius
                return start
            })
        },
        gradientColorArr () {
            let dashWdith = 5
            let dashSplit = 3
            if (this.dash.length === 3) {
                dashWdith = this.dash[0]
                dashSplit = this.dash[2]
            }
            let x = 0
            let len = 1
            let numWidth = this.realDatas.length ? this.realDatas[0] : 0
            while (x < numWidth) {
                x = x + dashWdith + dashSplit
                if (x <= numWidth) {
                    len++
                }
            }

            return this.getGradient(this.formColor, this.toColor, len)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>