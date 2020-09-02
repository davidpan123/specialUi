<template>
<div class="histogram" :id="id" :style="{'width': `${width}px`, 'height': `${height}px`}">
    <svg></svg>
</div>
</template>

<script>
import * as d3 from 'd3'
export default {
    name: 'DashRatioChart',
    props: {
        dataset: {
            type: Array,
            default: () => {
                return []
            }
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
        let total = this.getTotal()
        if (!total) return
        // 1.创建svg画布
        let width = document.getElementById(this.id).clientWidth
        let height = document.getElementById(this.id).clientHeight
        const svg = d3.select(this.$el).select('svg').attr('width', width).attr('height', height)
        // 2. 比例尺
        let xcale = d3.scaleLinear().domain([0, total]).range([0, width - this.padding.left - this.padding.right])
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
                let item0 = {
                    x: x,
                    color: this.getColor(x)
                }
                arr.push(item0)
                while (x < w) {
                    x = x + dashWdith + dashSplit
                    if (x <= w) {
                        let item = {
                            x: x,
                            color: this.getColor(x)
                        }
                        arr.push(item)
                    }
                }

                return arr
            })
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return d.x
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
            .attr('fill',  d => d.color)
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
        getTotal () {
            let total = 0
            this.dataset.forEach(item => {
                total += item.num
            })

            return total
        },
        getColor (num) {
            let color = ''
            for (let i = 0; i < this.realDatas.length; i++) {
                if (num <= this.realDatas[i].end) {
                    color = this.realDatas[i].color
                    break
                }
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
            let start = 0
            let maxWidth = this.width - this.padding.left - this.padding.right
            let total = 0
            this.dataset.forEach(item => {
                total += item.num
            })
            let radius = maxWidth / total
            return this.dataset.map(item => {
                start += item.num * radius
                return {
                    end: start,
                    color: item.color
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>