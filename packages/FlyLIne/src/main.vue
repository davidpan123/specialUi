<template>
  <div id="fly-line-container">
    <svg>
      <defs>
        <marker id="arrow"
          markerUnits="strokeWidth"
          markerWidth="20"
          markerHeight="20"
          viewBox="0 0 12 12"
          refX="6"
          refY="6"
          orient="auto">
          <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #FFE076;" />
        </marker>
        <mask id="Mask">
          <circle id="circle" r="50" fill="url(#grad)"  />
        </mask>
        <radialGradient
	        id="grad"
	        cx="0.5"
	        cy="0.5"
	        r="0.5" >
	        <stop offset="0%" stop-color="#fff" stop-opacity='1'/>
	        <stop offset="100%" stop-color="#fff" stop-opacity='0' />
	    </radialGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
/**
 * @description 飞线
 */
/* eslint-disable */
import * as d3 from 'd3'
export default {
  name: 'FlyLine',
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    lines: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.draw()
  },
  methods: {
    init () {
      let defaultConfig = {
        lineColor: '#FFCE00',
        isDash: true,
        dash: '3, 3',
        isFly: true,
        isShowArrow: true,
        flyLineColor: '#FFCE00'
      }

      this.mergeConfig = {...defaultConfig, ...this.config}
    },
    computeControlPoint(ps, pe, arc = 0.5) {
      if (arc > 1) {
        arc = 1
      }

      if (arc < -1) {
        arc = -1
      }
      const deltaX = pe[0] - ps[0]
      const deltaY = pe[1] - ps[1]
      const theta = Math.atan(deltaY / deltaX)
      const len = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) / 2 * arc
      const newTheta = theta - Math.PI / 2
      return [
        (ps[0] + pe[0]) / 2 + len * Math.cos(newTheta),
        (ps[1] + pe[1]) / 2 + len * Math.sin(newTheta)
      ]
    },
    transPath (point) {
      return `M${point.startPoint[0]},${point.startPoint[1]} Q${point.controlPoint[0]},${point.controlPoint[1]} ${point.endPoint[0]},${point.endPoint[1]}`
    },
    draw () {
      // 1. 绘制地图
      const self = this
      this.width = document.getElementById('fly-line-container').clientWidth
      this.height = document.getElementById('fly-line-container').clientHeight
      d3.select('svg').attr('width', this.width).attr('height', this.height)
      let svg = d3.select('svg')
      const pointData = []
      for (let i = 0; i < this.lines.length; i++) {
        // 绘制飞线
        let startPoint = this.lines[i].start
        let endPoint = this.lines[i].end
        pointData.push({
          startPoint,
          endPoint,
          controlPoint: this.computeControlPoint(startPoint, endPoint, this.lines[i].arcRadis)
        })
        let baseLineGroups = svg.append('g').attr('class', 'baseLineGroups')
        baseLineGroups.append('path')
          .attr('stroke', self.mergeConfig.lineColor)
          .attr('stroke-dasharray', () => {
            return self.mergeConfig.isDash ? self.mergeConfig.dash : null
          })
          .attr('fill', 'none')
          .attr('class', `line-path${i}`)
          .attr('d', () => this.transPath(pointData[i]))
        // 给飞线添加动画
        const lineGroups = svg.append('g').attr('class', 'lineGroups');
          let anPath = lineGroups.append('path')
            .attr('stroke', self.mergeConfig.flyLineColor)
            .attr('fill', 'none')
            // .attr('mask', `url(#mask)`)
            .attr("marker-end", () => {
              return self.mergeConfig.isShowArrow ? "url(#arrow)" : null
            })
        
        if (!this.mergeConfig.isFly) return
        let run = () => {
          anPath.transition()
            .duration(3000)
            .ease(d3.easeLinear)
            // .delay(1200)
            .attrTween('d', () => {
              let $path = d3.select(`.line-path${i}`).node()
              if ($path) {
                const l = $path.getTotalLength()
                const coord = $path.getAttribute('d').replace(/(M|Q)/g, '').match(/((\d|\.)+)/g)
                const x1 = +coord[0]; const y1 = +coord[1] // 起点
                const x2 = +coord[2]; const y2 = +coord[3] // 控制点
                
                return function (t) {
                  const p = $path.getPointAtLength(t * l);  // 新的终点
                  const x = ((1 - t) * x1) + (t * x2); const y = ((1 - t) * y1) + (t * y2)
                  //d3.select(`#circle${i}`).attr('cx', p.x).attr('cy', p.y);  // 蒙版坐标
                  return `M${x1},${y1} Q${x},${y} ${p.x},${p.y}`
                }
              }
            })
            .transition()
            .duration(3000)
            .on('end', run)
        }

        run()
      }
    }
  },
  watch: {
    lines (newVal, oldVal) {
      let baseLineGroups = d3.select('svg').selectAll('g.baseLineGroups')
      let lineGroups = d3.select('svg').selectAll('g.lineGroups')
      lineGroups.remove()
      baseLineGroups.remove()
      this.draw()
    }
  }
}
</script>

<style lang="scss" scoped>
#fly-line-container {
  width: 100%;
  height: 100%;
}
</style>
