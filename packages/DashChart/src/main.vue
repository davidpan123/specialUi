<template>
    <div class="histogram" :id="id" :style="{'width': `${width}px`, 'height': `${height}px`}">
        <svg></svg>
    </div>
</template>
 
<script>
/* eslint-disable */
import * as d3 from 'd3'
export default {
    name: 'DashChart',
    props: {
        dataset: {
            type: Array,
            default: []
        },
        xAxisArr: {
            type: Array,
            default: []
        },
        width: {
            type: Number,
            default: 600
        },
        height: {
            type: Number,
            default: 400
        },
        rectPadding: {
            type: Number,
            default: 40
        },
        color: {
            type: String,
            default: '#31cf78'
        },
        dash: {
            type: Array,
            default: () => {
                return [10, 5]
            }
        },
        yAxisNum: {
            type: Number,
            default: 5
        },
        tickSizeInner: {
            type: Number,
            default: 0
        },
        tickSizeOuter: {
            type: Number,
            default: 0
        },
        tickPadding: {
            type: Number,
            default: 10
        },
        axisColor: {
            type: String,
            default: '#666'
        },
        axisTextColor: {
            type: String,
            default: '#333'
        },
        textStyle: {
            type: Object,
            default: () => {
                return {
                    fontSize: '14px',
                    color: '#333333',
                    dx: 5,
                    dy: -15
                }
            }
        },
        padding: {
            type: Object,
            default: () => {
                return {
                    top: 60,
                    bottom: 60,
                    left: 60,
                    right: 60
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
        //1.创建svg画布
        let marge = { top: this.padding.top, bottom: this.padding.bottom, left: this.padding.left, right: this.padding.right }
        let width = document.getElementById(this.id).clientWidth
        let height = document.getElementById(this.id).clientHeight
        const svg = d3.select(this.$el).select('svg').attr('width', width).attr('height', height)
        let g = svg.append('g').attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')
        //2.数据集
        // this.dataset
        //3.坐标轴
        //x轴序数比例尺（d3.scaleBand()并不是一个连续性的比例尺，domain()中使用一个数组，不过range()需要是一个连续域）
        let ranges = d3.range(this.dataset.length)
        let xcale = d3.scaleBand().domain(ranges).range([0, width - marge.left - marge.right])
        let xAxis = d3.axisBottom(xcale)
            .tickFormat(this.formatXaxis)
            .tickSizeInner(this.tickSizeInner)
            .tickSizeOuter(this.tickSizeInner)
            .tickPadding(this.tickPadding)
        g.append('g')
            .attr('transform', 'translate(' + 0 + ',' + (height - marge.top - marge.bottom) + ')')
            .call(xAxis)

        //y轴线性比例尺
        let yscale = d3.scaleLinear().domain([0, d3.max(this.dataset)]).range([height - marge.top - marge.bottom, 0])
        let yAxis = d3.axisLeft(yscale)
            .ticks(this.yAxisNum)
            .tickSizeInner(this.tickSizeInner)
            .tickSizeOuter(this.tickSizeInner)
            .tickPadding(this.tickPadding)
        g.append('g')
            .attr('transform', 'translate(0, 0)')
            .call(yAxis)

        // 设置坐标轴和文字颜色
        g.selectAll('path.domain').attr('stroke', this.axisColor)
        g.selectAll('text').attr('fill', this.axisTextColor)
        //4.为每个矩形和对应的文字创建一个分组<g>
        let gs = g.selectAll('rect')
            .data(this.dataset)
            .enter()
            .append('g')
        //5.绘制矩形
        //设置矩形之间的间隙
        let dashWdith = 10
        let dashSplit = 5
        if (this.dash && this.dash.length === 2) {
            dashWdith = Number(this.dash[0])
            dashSplit = Number(this.dash[1])
        }
        let rectPadding = this.rectPadding || 40 
        gs.selectAll('rect')
            .data((d, i) => {
                if (!d) return []
                let arr = []
                let reactHeight = height - marge.top - marge.bottom - yscale(d)
                let h = 0
                let item0 = {
                    x: xcale(i) + rectPadding / 2,
                    width: xcale.step() - rectPadding,
                    y: height - marge.top - marge.bottom - h - dashWdith
                }
                arr.push(item0)
                while (h < reactHeight) {
                    h = h + dashWdith + dashSplit
                    if (h <= reactHeight) {
                        let item = {
                            x: xcale(i) + rectPadding / 2,
                            width: xcale.step() - rectPadding,
                            y: height - marge.top - marge.bottom - h - dashWdith
                        }
                        arr.push(item)
                    }
                }

                h = 0
                item0 = {}
                return arr
            })
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return d.x
            })
            .attr('width', function(d) {
                return d.width
            })
            .attr('y', function(d){
                return d.y
            })
            .attr('height', function(d){
                return dashWdith
            })
            .attr('fill',  this.color)
        //6.绘制文字
        let fontSize = this.textStyle.fontSize || '14px'
        let color = this.textStyle.color || '#333'
        let dx = this.textStyle.dx || 5
        let dy = this.textStyle.dy || -15
        gs.append('text')
            .attr('font-size', fontSize)
            .attr('fill', color)
            .attr('x', function(d, i) {
                return xcale(i) + rectPadding/2
            })
            .attr('y', function(d) {
                return yscale(d)
            })
            .attr('dx', dx)
            .attr('dy', dy)
            .text(function(d) {
                return d
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
        formatXaxis (d) {
            return this.xAxisArr.length ? this.xAxisArr[d] : d
        }
    }
}
</script>
 
<style lang="scss" scoped>
</style>
