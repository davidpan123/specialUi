#  specialUi
你要的特效UI组件在这里！来看看有惊喜的！

## Install
```bash
npm i special-ui
```
   
## Usage
### 全局使用
```js
import Vue from 'vue'
import specialUi from 'special-ui'
Vue.use(specialUi)
```
### 按需引入
```js
import Vue from 'vue'
import {FlyLine} from 'special-ui'
Vue.use(FlyLine)
```

## 1. FlyLine 组件
一个2维的飞线组件
### 效果图
![avatar](https://cdn.nlark.com/yuque/0/2020/png/617302/1596187806727-afa89dab-55dd-40a4-9de3-756ea5d28ee6.png)

### 飞线使用
#### 引入
```js
import Vue from 'vue'
import {FlyLine} from 'special-ui'
Vue.use(FlyLine)
```
#### 使用
```js
lines = [
    {
        start: [329.3029054888133, 166.22157534665564],
        end: [800, 80],
    },
    {
        start: [829.3029054888133, 166.22157534665564],
        end: [1400, 80],
        arcRadis: -0.6
    }
]

config = {
    isDash: false
}
```
```html
<fly-lIne :lines="lines" :config="config"></fly-lIne>
```
#### 组件参数
config: 对象
属性|说明|默认值
--|:--:|--:
lineColor|飞线颜色|#FFCE00
isDash|是否是虚线|true
dash|虚线配置|'3, 3'
isFly|是否显示飞线动效|true
flyLineColor|飞线动效颜色|#FFCE00
isShowArrow|是否显示箭头|true

lines: 数组
属性|说明|默认值
--|:--:|--:
start|起点坐标|无
end|终点坐标|无
arcRadis|曲线系数|0.5


## 2. AirLoading 组件
一个无人机动画加载组件
### 效果图
![avatar](https://cdn.nlark.com/yuque/0/2020/png/617302/1596187843638-a838a2a7-6595-469b-9274-ac495464ea15.png?x-oss-process=image%2Fresize%2Cw_660)

### 无人机动画加载组件使用
#### 引入
```js
import Vue from 'vue'
import {AirLoading} from 'special-ui'
Vue.use(AirLoading)
```
#### 使用
```html
<air-loading :loading="loading"></air-loading>
```
#### 组件参数
属性|说明|默认值
--|:--:|--:
loading|是否加载|true

## 3. RingChart 组件
一个炫酷的环形占比组件

### 效果图
![avatar](https://cdn.nlark.com/yuque/0/2020/png/617302/1596187883253-17371ba0-bd01-4721-940f-f74d1e9a362e.png?x-oss-process=image%2Fresize%2Cw_680)

### 环形占比组件使用
#### 引入
```js
import Vue from 'vue'
import {RingChart} from 'special-ui'
Vue.use(RingChart)
```
#### 使用
```js
config = {
    ring: {
        outDash: {
            height: 10
        },
        progress: {
            num: 30
        }
    },
    text: {
        title: {
            color: '#fff222'
        }
    }
}
```
```html
<ring-chart :r="500" :num="20" :total="100" :title="'占比'" :subTitle="'20%'" :config="config"/>
```
#### 组件参数
属性|说明|默认值
--|:--:|--:
r|半径(控制宽高)|300
total|总数|0
num|占比数|0
title|内部大标题|''
subTitle|内部小标题|''
config|环形参数对象|{}

config对象参数说明:
属性|说明|默认值
--|:--:|--:
text|文本对象|{}
ring|环形图对象|{}

text参数说明:  
color: 标题颜色;  
fontSize: 标题字体;  
dx: 标题x偏移量(默认居中);  
dy: 标题y偏移量(默认居中);  


属性|说明|默认值
--|:--:|--:
title|大标题|{ color: '#ffffff',  fontSize: '18px', dx: 0, dy: -5) }
subTitle|小标题|{ color: '#ffffff', fontSize: '14px', dx: 0, dy: 15 }

ring参数说明:  
outDash: 设置最外层虚线参数;  
outRing：设置外层实线参数;  
innerRing：设置内层实线参数;  
progress：设置进度条参数;  
anniCircle：设置内层动画参数;
属性|说明|默认值
--|:--:|--:
title|大标题|{ color: '#ffffff',  fontSize: '18px', dx: 0, dy: -5) }
subTitle|小标题|{ color: '#ffffff', fontSize: '14px', dx: 0, dy: 15 }

outDash参数说明:  
属性|说明|默认值
--|:--:|--:
height|高度|5
dash|虚线宽度及间隔|'2, 3'
color|颜色|'2, 3'

outRing|innerRing参数说明:  
属性|说明|默认值
--|:--:|--:
height|高度|5
color|颜色|'2, 3'

progress参数说明: 
属性|说明|默认值
--|:--:|--:
color|颜色|'rgba(18,253,240,0.30)'
activeColor|高亮颜色|'#09C889'

anniCircle参数说明:  
属性|说明|默认值
--|:--:|--:
color|颜色|'#F47153'
radius|半径|3


## 3. RingChart 组件
流程图组件

### 效果图
![avatar](https://cdn.nlark.com/yuque/0/2020/png/617302/1596437079488-9a73b03f-e980-4996-8ff8-d04f03956ee1.png)
### 无人机动画加载组件使用
#### 引入
```js
import Vue from 'vue'
import {FlowChart} from 'special-ui'
Vue.use(FlowChart)
```
#### 使用
```html
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
```
#### 组件参数
属性|说明|默认值
--|:--:|--:
nodes|流程图节点|[]
edges|流程图连线|[]
nodeStyle|节点样式|' ', 遵循svg样式
eageStyle|连线样式|' ', 遵循svg样式
arrowheadStyle|连线箭头样式|' ', 遵循svg样式
labelStyle|文字样式|' ', 遵循svg样式

#### 说明
可以在节点数组项中配置nodeStyle、labelStyle; 连线数组中配置eageStyle、arrowheadStyle、labelStyle;  
配置了单项的样式后，优先级高于全局样式配置

#### 事件
属性|说明
onSelect|节点点击事件