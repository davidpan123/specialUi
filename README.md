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
### 飞线效果图
![avatar](https://cdn.nlark.com/yuque/0/2020/png/617302/1595835470487-e71deee1-4fb0-4d73-a297-a15066d827d9.png?x-oss-process=image%2Fresize%2Cw_746)

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