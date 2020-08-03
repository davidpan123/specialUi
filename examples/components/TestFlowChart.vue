<template>
<div class="container">
    <flow-chart :nodes="nodes" :edges="edges" :nodeStle="nodeStle" :eageStle="eageStle" :arrowheadStyle="arrowheadStyle" :direction="'TB'" @onSelect="selectNode"/>
</div>
</template>

<script>
export default {
    data () {
        return {
            nodeStle: 'stroke: #333; fill: #fff;',
            eageStle: 'stroke: #f66; stroke-width: 1px;',
            arrowheadStyle: 'stroke: #f66;',
            labelStyle: 'fill: #333; font-size: 14px',
            nodes: [],
            edges: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        selectNode (d) {
            console.log(d)
        },
        init () {
            this.nodes = [
                {
                    id: 'e0',
                    value: {
                        label: '开始'
                    }
                },
                {
                    id: 'e1',
                    class: 'diamond',
                    labelStyle: 'fill: #aaa; font-size: 18px',
                    value: {
                        label: '条件',
                        shape: 'diamond'
                    }
                },
                {
                    id: 'e2',
                    style: 'stroke: #fff; fill: #61b2e4',
                    value: {
                        label: '分支一',
                        shape: 'ellipse'
                    }
                },
                {
                    id: 'e3',
                    value: {
                        label: '分支二',
                        shape: 'ellipse'
                    }
                },
                {
                    id: 'e4',
                    value: {
                        label: '节点3'
                    }
                },
                {
                    id: 'e5',
                    value: {
                        label: '节点4'
                    }
                },
                {
                    id: 'e6',
                    value: {
                        label: '结束',
                        shape: 'circle'
                    }
                }
            ]
            this.edges = [
                {
                    from: 'e0', 
                    to: 'e1'
                },
                {
                    from: 'e1', 
                    to: 'e2',
                    label: '条件1'
                },
                {
                    from: 'e1', 
                    to: 'e3',
                    label: '条件2'
                },
                {
                    from: 'e2', 
                    to: 'e4',  
                },
                {
                    from: 'e3', 
                    to: 'e5',
                },
                {
                    from: 'e4', 
                    to: 'e6'
                },
                {
                    from: 'e5', 
                    to: 'e6'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>