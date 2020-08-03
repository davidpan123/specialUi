<template>
<div :id="containerId" class="dagre-graph-container">
    <svg class="dagre">
        <g class="container"></g>
    </svg>
</div>
</template>

<script>
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
let container = null
export default {
    name: 'FlowChart', 
    props: {
        direction: {
            type: String,
            default: 'LR'
        },
        nodes: {
            type: Array,
            default: []
        },
        edges: {
            type: Array,
            default: []
        },
        nodeStle: {
            type: String,
            default: ''
        },
        eageStle: {
            type: String,
            default: ''
        },
        labelStyle: {
            type: String,
            default: ''
        },
        arrowheadStyle: {
            type: String,
            default: ''  
        }
    },
    data () {
        return {
            id: '',
            renderer: null,
            graph: null,
            // direction: 'LR',
            directions: [
                {
                    prop: 'LR',
                    label: '从左至右'
                },
                {
                    prop: 'RL',
                    label: '从右至左'
                },
                {
                    prop: 'TB',
                    label: '从上至下'
                },
                {
                    prop: 'BT',
                    label: '从下至上'
                }
            ],
            zoom: null,
            containerId: '',
            width: 0,
            height: 0
        }
    },
    created () {
        this.containerId = this.uuid()
        this.graph = new dagreD3.graphlib.Graph().setGraph({
            rankdir: this.direction
        }).setDefaultEdgeLabel(function () { return {} })
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
        zoomCtrl (symbal) {
            let scale = symbal === 'out' ? 1.1 : 0.8
            const svg = d3.select(this.$el).select('svg.dagre')
            this.zoom.scaleBy(svg, scale)
        },
        /** 
         * @description control the canvas zoom to up or down
         */
        zoomed () {
            d3.select(this.$el).select('g.container').attr('transform', d3.event.transform)
        },
        /** 
         * @description 画节点
         */
        strokeNodes () {
            let self = this
            // 获取之前的nodes缓存并清除
            let nodes = this.graph.nodes()
            if (nodes.length) {
                nodes.forEach(
                    item => {
                        this.graph.removeNode(item)
                    }
                )
            }
            
            //通过shape来画shape(ellipse: 分支； circle：合流)
            this.nodes.forEach(
                (item) => {
                    let shapeObjs = {
                        'circle': 'circle',
                        'ellipse': 'ellipse',
                        'diamond': 'diamond',
                    }
                    let shape = item.value.shape ? (shapeObjs[item.value.shape] || 'rect') : 'rect'
                    
                    this.graph.setNode(
                        item.id, 
                        { 
                            label: item.value.label, 
                            shape: shape, 
                            style: item.style || self.nodeStle,
                            labelStyle: item.labelStyle || this.labelStyle,
                            class: item.class || null
                        }
                    )
                }
            )
            this.renderer(container, this.graph)   
        },
        /** 
         * @description 画线
         */
        strokeEdges () {
            //一个脚本节点时：不渲染eage
            if (this.nodes.length > 1) {
                this.edges.forEach(
                    (item) => {
                        if (item.label) {
                            this.graph.setEdge(item.from, item.to, {label: item.label, style: item.eageStle || this.eageStle, arrowheadStyle: item.arrowheadStyle || this.arrowheadStyle, labelStyle: item.labelStyle || this.labelStyle})   
                        } else {
                            this.graph.setEdge(item.from, item.to, {style: item.eageStle || this.eageStle, arrowheadStyle: item.eageStle || this.arrowheadStyle})    
                        }         
                    }
                )
                this.renderer(container, this.graph)  
            }      
        }
    },
    mounted () {
        this.width = document.getElementById(this.containerId).clientWidth
        this.height = document.getElementById(this.containerId).clientHeight
        // eslint-disable-next-line
        this.renderer = new dagreD3.render()
        const svg = d3.select(this.$el).select('svg.dagre')
            .attr('width', this.width)
            .attr('height', this.height)
 
        container = svg.select('g.container')
        // transform
        const transform = d3.zoomIdentity.translate(this.width / 3, this.height / 3).scale(1)    
        this.zoom = d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on('zoom', this.zoomed)
        container.transition().duration(750).call(this.zoom.transform, transform)
        svg.call(this.zoom)
 
        this.strokeNodes()
        this.strokeEdges()

        let selectionsNode = container.selectAll('g.node')
        selectionsNode
            //click 点击事件
            .on('click', d => {
                this.$emit('onSelect', d)
            }) 
    },
    watch: {
        nodes () {
            this.strokeNodes()              
        },
        edges () {
            this.strokeEdges()
        },
        direction () {
            this.graph.setGraph({
                rankdir: this.direction
            })
            this.renderer(container, this.graph)
        }
    }
}
</script>
<style lang="scss">
.dagre-graph-container {
    height: 100%;
}

/**************** dagre 节点图************************/
g.node {
    cursor: pointer;
    text {
        fill: #333;
    }
}

g.edgePath {
    path {
        stroke: #333; 
        stroke-width: 1px;
        fill: none;
    }
}
</style>