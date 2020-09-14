<!--
 * @Description: gradient dash chart component
 * @Author: pan
 * @Date: 2020-08-13 09:30
 * @LastEditTime: 2020-08-13 09:30
 * @LastEditors: pan
 -->
<template>
  <div class="gradient_dash_chart" :id="id" :style="{'width': `${width}px`, 'height': `${height}px`}">
    <svg></svg>
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3'
export default {
  name: 'GradientDashChart',
  props: {
    direction: {
      type: String,
      default: () => 'y'
    },
    dataset: {
      type: Array,
      default: () => {
        return []
      }
    },
    axisArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 300
    },
    formColor: {
      type: String,
      default: () => '#0B3C65'
    },
    toColor: {
      type: String,
      default: () => '#37C6EA'
    },
    lastColor: {
      type: String,
      default: () => '#ffffff'
    },
    dash: {
      type: Array,
      default: () => {
        return [10, 25, 5]
      }
    },
    isShowXaxis: {
      type: Boolean,
      default: true
    },
    isShowYaxis: {
      type: Boolean,
      default: true
    },
    raduis: {
      type: Number,
      default: 3
    },
    axisNum: {
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
    xAxisTextColor: {
      type: String,
      default: ''
    },
    yAxisTextColor: {
      type: String,
      default: ''
    },
    axisTextSize: {
      type: String,
      default: '14px'
    },
    xAxisTextSize: {
      type: String,
      default: ''
    },
    yAxisTextSize: {
      type: String,
      default: ''
    },
    textStyle: {
      type: Object,
      default: () => {
        return {
          fontSize: '14px',
          color: '#fff',
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
    },
    blankDivisor: {
      type: Number,
      default: 1.2
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
    let g = svg.append('g').attr('transform', 'translate(' + marge.left + ',' + marge.top + ')')
    //2.数据集
    // this.dataset
    //3.坐标轴
    //x轴序数比例尺（d3.scaleBand()并不是一个连续性的比例尺，domain()中使用一个数组，不过range()需要是一个连续域）
    // 主轴Y
    let ranges = d3.range(this.dataset.length)
    // x轴线性比例尺
    if (this.direction === 'x') {
      let xcale = d3.scaleLinear().domain([0, d3.max(this.dataset) * this.blankDivisor]).range([0, width - marge.left - marge.right])
      if (this.isShowXaxis) {
        let xAxis = d3.axisBottom(xcale)
          .ticks(this.axisNum)
          .tickSizeInner(this.tickSizeInner)
          .tickSizeOuter(this.tickSizeInner)
          .tickPadding(this.tickPadding)
        g.append('g')
          .attr('class', 'x')
          .attr('transform', 'translate(' + 0 + ',' + (height - marge.top - marge.bottom) + ')')
          .call(xAxis)
      }

      //y 轴线序列比例尺
      let yscale = d3.scaleBand().domain(ranges).range([height - marge.top - marge.bottom, 0])

      if (this.isShowYaxis) {
        let yAxis = d3.axisLeft(yscale)
          .tickFormat(this.formatAxis)
          .tickSizeInner(this.tickSizeInner)
          .tickSizeOuter(this.tickSizeInner)
          .tickPadding(this.tickPadding)
        g.append('g')
          .attr('class', 'y')
          .attr('transform', 'translate(0, 0)')
          .call(yAxis)
      }
    
      // 设置坐标轴和文字颜色
      g.selectAll('path.domain').attr('stroke', this.axisColor)
      // 设置坐标轴文字颜色和大小
      let xAxisTextColor = this.xAxisTextColor || this.axisTextColor
      let yAxisTextColor = this.yAxisTextColor || this.axisTextColor
      let xAxisTextSize = this.xAxisTextSize || this.axisTextSize
      let yAxisTextSize = this.yAxisTextSize || this.axisTextSize
      g.select('g.x')
        .selectAll('text')
        .attr('fill', xAxisTextColor)
        .attr('font-size', xAxisTextSize)

      g.select('g.y')
        .selectAll('text')
        .attr('fill', yAxisTextColor)
        .attr('font-size', yAxisTextSize)

      //4.为每个矩形和对应的文字创建一个分组<g>
      let gs = g.selectAll('rect')
          .data(this.dataset)
          .enter()
          .append('g')
      //5.绘制矩形
      //设置矩形之间的间隙
      let dashWdith = 5
      let dashHeight = 10
      let dashSplit = 5
      if (this.dash && this.dash.length === 3) {
          dashWdith = Number(this.dash[0])
          dashHeight = Number(this.dash[1])
          dashSplit = Number(this.dash[2])
      }

      let len = 1
      let colorArr = []
      gs.selectAll('rect')
          .data((d, i) => {
              if (!d) return []
              let arr = []
              let maxWidth = xcale(d)
              let w = 0
              let len = 1
              let step = yscale.step()
              let item0 = {
                  x: 0,
                  y: yscale(i) + step - dashHeight - (step - dashHeight) / 2,
              }
              arr.push(item0)
              while (w < maxWidth) {
                  w = w + dashWdith + dashSplit
                  if (w <= maxWidth) {
                      ++len
                      let item = {
                          x: w,
                          y: yscale(i) + step - dashHeight - (step - dashHeight) / 2,
                      }
                      arr.push(item)
                  }
              }

              w = 0
              item0 = {}
              arr[0].len = len
              return arr
          }
      )
      .enter()
      .append('rect')
      .attr('x', function(d) {
          return d.x
      })
      .attr('width', function(d) {
          return dashWdith
      })
      .attr('y', function(d){
          return d.y
      })
      .attr('height', function(d){
          return dashHeight
      })
      .attr('rx', this.raduis)
      .attr('ry', this.raduis)
      .attr('fill',  (d, i) => {
          if (i === 0) {
              len = d.len
              if (len === 1) {
                  return this.toColor
              } else {
                  colorArr = this.gradient(this.formColor, this.toColor, len)
                  return colorArr[i]
              }
          } else {
              if (i === len - 1) {
                  return this.lastColor
              }
              return colorArr[i]
          }
      })

      //6.绘制文字
      let fontSize = this.textStyle.fontSize || '14px'
      let color = this.textStyle.color || '#333'
      let dx = this.textStyle.dx !== undefined && this.textStyle.dx !== null ? this.textStyle.dx : 5
      let dy = this.textStyle.dy !== undefined && this.textStyle.dy !== null ? this.textStyle.dy : -10
      gs.append('text')
          .attr('font-size', fontSize)
          .attr('text-anchor', 'end')
          .attr('fill', color)
          .attr('x', function(d) {
              return xcale(d)
          })
          .attr('y', function(d, i) {
              let step = yscale.step()
              return yscale(i) + step - dashHeight - (step - dashHeight) / 2
          })
          .attr('dx', dx)
          .attr('dy', dy)
          .text(function(d) {
              return d > 0 ? d : ''
          })
    } else {
      let xcale = d3.scaleBand().domain(ranges).range([0, width - marge.left - marge.right])
      if (this.isShowXaxis) {
        let xAxis = d3.axisBottom(xcale)
          .tickFormat(this.formatAxis)
          .tickSizeInner(this.tickSizeInner)
          .tickSizeOuter(this.tickSizeInner)
          .tickPadding(this.tickPadding)
        g.append('g')
          .attr('class', 'x')
          .attr('transform', 'translate(' + 0 + ',' + (height - marge.top - marge.bottom) + ')')
          .call(xAxis)
      }

      //y 轴线序列比例尺
      let yscale = d3.scaleLinear().domain([0, d3.max(this.dataset) * this.blankDivisor]).range([height - marge.top - marge.bottom, 0])
      if (this.isShowYaxis) {
        let yAxis = d3.axisLeft(yscale)
          .ticks(this.axisNum)
          .tickSizeInner(this.tickSizeInner)
          .tickSizeOuter(this.tickSizeInner)
          .tickPadding(this.tickPadding)
        g.append('g')
          .attr('class', 'y')
          .attr('transform', 'translate(0, 0)')
          .call(yAxis)
      }
    
      // 设置坐标轴和文字颜色
      g.selectAll('path.domain').attr('stroke', this.axisColor)

      let xAxisTextColor = this.xAxisTextColor || this.axisTextColor
      let yAxisTextColor = this.yAxisTextColor || this.axisTextColor
      let xAxisTextSize = this.xAxisTextSize || this.axisTextSize
      let yAxisTextSize = this.yAxisTextSize || this.axisTextSize
      g.select('g.x')
        .selectAll('text')
        .attr('fill', xAxisTextColor)
        .attr('font-size', xAxisTextSize)

      g.select('g.y')
        .selectAll('text')
        .attr('fill', yAxisTextColor)
        .attr('font-size', yAxisTextSize)

      //4.为每个矩形和对应的文字创建一个分组<g>
      let gs = g.selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('g')

      //5.绘制矩形
      //设置矩形之间的间隙
      let dashWdith = 5
      let dashHeight = 10
      let dashSplit = 5
      if (this.dash && this.dash.length === 3) {
        dashWdith = Number(this.dash[0])
        dashHeight = Number(this.dash[1])
        dashSplit = Number(this.dash[2])
      }

      let len = 1
      let colorArr = []
      gs.selectAll('rect')
        .data((d, i) => {
          if (!d) return []
          let arr = []
          let maxHeight = height - marge.top - marge.bottom - yscale(d)
          let h = 0
          let len = 1
          let step = xcale.step()
          let item0 = {
            x: xcale(i) + step - dashWdith - (step - dashWdith) / 2,
            y: height - marge.top - marge.bottom - h - dashHeight
          }
          arr.push(item0)
          while (h < maxHeight) {
            h = h + dashHeight + dashSplit
            if (h < maxHeight) {
              ++len
              let item = {
                x: xcale(i) + step - dashWdith - (step - dashWdith) / 2,
                y: height - marge.top - marge.bottom - h - dashHeight,
              }
              arr.push(item)
            }
          }

          h = 0
          item0 = {}
          arr[0].len = len
          return arr
        }
      )
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return d.x
      })
      .attr('width', function(d) {
        return dashWdith
      })
      .attr('y', function(d){
        return d.y
      })
      .attr('height', function(d){
        return dashHeight
      })
      .attr('rx', this.raduis)
      .attr('ry', this.raduis)
      .attr('fill',  (d, i) => {
        if (i === 0) {
          len = d.len
          if (len === 1) {
            return this.toColor
          } else {
              colorArr = this.gradient(this.formColor, this.toColor, len)
            return colorArr[i]
          }
        } else {
          if (i === len - 1) {
            return this.lastColor
          }
          return colorArr[i]
        }
      })

      // 6.绘制文字
      let fontSize = this.textStyle.fontSize || '14px'
      let color = this.textStyle.color || '#333'
      let dx = this.textStyle.dx !== undefined && this.textStyle.dx !== null ? this.textStyle.dx : 5
      let dy = this.textStyle.dy !== undefined && this.textStyle.dy !== null ? this.textStyle.dy : -10
      gs.append('text')
        .attr('font-size', fontSize)
        .attr('text-anchor', 'middle')
        .attr('fill', color)
        .attr('x', function(d, i) {
          let step = xcale.step()
          return xcale(i) + step - dashWdith/2 - (step - dashWdith) / 2
        })
        .attr('y', function(d, i) {
          return yscale(d)
        })
        .attr('dx', dx)
        .attr('dy', dy)
        .text(function(d) {
          return d > 0 ? d : ''
        })
    }
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
    formatAxis (d) {
        return this.axisArr.length ? this.axisArr[d] : d
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
    gradient (startColor, endColor, step){
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
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>
