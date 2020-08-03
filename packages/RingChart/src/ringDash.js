import * as d3 from 'd3';
class RingDash {
    constructor (option) {
        this.selOption(option);
        this.resolveOpt(this.options)
        this.setOption()
    }

    /**
     * @description 拓展对象
     * newconfig = extend({}, defaultConfig, myconfig)
     */
    extend (target) {
        let sources = Array.prototype.slice.call(arguments, 1);

        for (let i = 0; i < sources.length; i += 1) {
            let source = sources[i]
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    }

    selOption (option) {
        let title = {}
        let subTitle = {}
        let outDash = {}
        let outRing = {}
        let innerRing = {}
        let progress = {}
        let anniCircle = {}
        option.text && ({ title, subTitle } = option.text)
        option.ring && ({ outDash, outRing, innerRing, progress, anniCircle } = option.ring)
        let defaultOps = {
            el: option.el,
            width: option.width || 300,
            height: option.height || 300,
            title: option.title || '',
            subTitle: option.subTitle || '',
            total: option.total || 0,
            num: option.num || 60,
            ring: {
                outDash: {...{
                    height: 5,
                    dash: '2, 3',
                    color: '#095D58'
                }, ...outDash},
                outRing: {...{
                    height: 2,
                    color: '#06AA63',
                }, ...outRing},
                innerRing: {...{
                    height: 2,
                    color: '#0086FF'
                }, ...innerRing},
                progress: {...{
                    color: 'rgba(18,253,240,0.30)',
                    activeColor: '#09C889',
                    num: 60,
                }, ...progress},
                anniCircle: {...{
                    color: '#F47153',
                    radius: 3
                }, ...anniCircle}
            },
            text: {
                title: {...{
                    color: '#ffffff',
                    fontSize: '18px',
                    dx: 0,
                    dy: -5
                }, ...title},
                subTitle: {...{
                    color: '#ffffff',
                    fontSize: '14px',
                    dx: 0,
                    dy: 15
                }, ...subTitle}
            }
        }
       
        this.options = defaultOps;
    }

    resolveOpt (option) {
        this.center = Math.min(option.width, option.height) / 2;

        this.svg = d3.select(option.el).append('svg')
            .attr('width', option.width)
            .attr('height', option.height)

        let scale = this.scale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, option.height * 1]);
        
        let pie = d3.pie()
        this.arc = d3.arc()
            .innerRadius(scale(25))
            .outerRadius(scale(35))

        let num = this.options.ring.progress.num || 60
        this.datas = pie(Array(num).fill(1)).reverse().map(function (d, i) {
            d.endAngle = d.endAngle - 2.5 / 360 * Math.PI 
            d.startAngle = d.startAngle + 2.5 / 360 * Math.PI
            return d
        })
    }

    setOption () {
        let {center, svg, datas, arc, scale} = this

        // 外层虚线框
        let outDashColor = this.options.ring.outDash.color || '#095D58'
        let outDashWidth = this.options.ring.outDash.height || 5
        let outDashArr = this.options.ring.outDash.dash || '2 3'
        svg.append('circle')
            .attr('cx', center)
            .attr('cy', center)
            .attr('r', scale(41))
            .attr('fill', 'none')
            .attr('stroke', outDashColor)
            .attr('stroke-width', outDashWidth)
            .attr('stroke-dasharray', outDashArr)
            
        // 外层实线框
        let outRingColor = this.options.ring.outRing.color || '#06AA63'
        let outRingWidth = this.options.ring.outRing.height || 2
        svg.append('circle')
            .attr('cx', center)
            .attr('cy', center)
            .attr('r', scale(38))
            .attr('fill', 'none')
            .attr('stroke', outRingColor)
            .attr('stroke-width', outRingWidth)

        // 背景条状图层
        let progressBacColor = this.options.ring.progress.color || 'rgba(18,253,240,0.30)'
        svg.append('g')
            .attr('transform', `translate(${center}, ${center})`)
            .selectAll('path')
            .data(datas)
            .enter()
            .append('path')
            .attr('fill', progressBacColor)
            .attr('d', arc)

        // 进度条
        let num = this.options.ring.progress.num || 60
        let rateNum = this.options.num || 0
        let rateToatl = this.options.total || 0
        let progressActColor = this.options.ring.progress.activeColor || '#09C889'
        svg.append('g')
            .attr('transform', `translate(${center}, ${center})`)
            .selectAll('path')
            .data(datas)
            .enter()
            .append('path')
            .transition()
            .delay(function (d, i) {
                return i * 20
            })
            .attr('fill', function (d, i) {
                if (!rateToatl) return 'transparent'
                return i / num >= rateNum / rateToatl ? 'transparent' : progressActColor
            })
            .attr('d', arc)
        
        // 内层实线框
        let innerRingWidth = this.options.ring.innerRing.height || 2
        let innerRingColor = this.options.ring.innerRing.color || '#0086FF'
        svg.append('circle')
            .attr('cx', center)
            .attr('cy', center)
            .attr('r', scale(24.4))
            .attr('fill', 'none')
            .attr('stroke', innerRingColor)
            .attr('stroke-width', innerRingWidth)
        
        // 动画原点   
        let anniCircleRadius = this.options.ring.anniCircle.radius || 3
        let anniCircleColor = this.options.ring.anniCircle.color || '#F47153'
        svg.append('g')
            .classed('point-monocyclic', true)
            .selectAll('circle')
            .data([0, 1, 2, 3])
            .enter()
            .append('circle')
            .attr('cx', function (d, idx) {
                if (idx < 2) {
                    return idx === 0 ? scale(28) : scale(71)
                } else {
                    return center
                }
            })
            .attr('cy', function (d, idx) {
                if (idx < 2) {
                    return center
                } else {
                    return idx === 2 ? scale(28) : scale(71)
                }
            })
            .attr('r', anniCircleRadius)
            .attr('fill', anniCircleColor)

        // 添加文字
        if (this.options.subTitle) {
            let subTitleColor = this.options.text.subTitle.color || 'ffffff'
            let subTitleFontSize = this.options.text.subTitle.fontSize || '14px'
            let subTitleDx = this.options.text.subTitle.dx || 0
            let subTitleDy = this.options.text.subTitle.dy || 15
            svg.append('text')
                .attr('x', center)
                .attr('y', center)
                .attr('dx', subTitleDx)
                .attr('dy', subTitleDy)
                .attr('font-size', subTitleFontSize)
                .attr('text-anchor', 'middle')
                .attr('fill', subTitleColor)
                .attr('width', scale(center))
                .text(d => this.options.subTitle)
        }

        if (this.options.title) {
            let titleColor = this.options.text.title.color || 'ffffff'
            let titleFontSize = this.options.text.title.fontSize || '18px'
            let titleDx = this.options.text.title.dx || 0
            let titleDy = this.options.subTitle ? (this.options.text.title.dy || -5) : 0
            svg.append('text')
                .attr('x', center)
                .attr('y', center)
                .attr('dx', titleDx)
                .attr('dy', titleDy)
                .attr('font-size', titleFontSize)
                .attr('text-anchor', 'middle')
                .attr('fill', titleColor)
                .attr('width', scale(center))
                .text(d => this.options.title)
        }
       
    }
}

export default RingDash