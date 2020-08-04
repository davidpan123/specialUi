<template>
  <div id="select-screen" draggable="false">
       <div id="perspective">
            <div id="wrap">
                <img v-for="(item, index) in screenList" :key="index" :src="item.url" @dblclick="selectScreenItem(item)">
            </div>
        </div>
  </div>
</template>

<script>
  export default {
    name: 'PhotoWall',
    props: {
      visble: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        oWrap: null,
        screenList: [
          { id: 1, url: require('./images/screenList/1.jpg') },
          { id: 2, url: require('./images/screenList/2.jpg') },
          { id: 3, url: require('./images/screenList/3.jpg') },
          { id: 4, url: require('./images/screenList/4.jpg') },
          { id: 5, url: require('./images/screenList/5.jpg') },
          { id: 6, url: require('./images/screenList/6.jpg') },
          { id: 7, url: require('./images/screenList/7.jpg') },
          { id: 8, url: require('./images/screenList/8.jpg') },
          { id: 9, url: require('./images/screenList/9.jpg') },
          { id: 19, url: require('./images/screenList/9.jpg') },
          { id: 29, url: require('./images/screenList/9.jpg') },
          { id: 39, url: require('./images/screenList/9.jpg') },
          { id: 10, url: require('./images/screenList/10.jpg') }
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        document.onselectstart=function(){return false;}
        this.oWrap = document.getElementById('wrap')
        let oImg = this.oWrap.getElementsByTagName('img')
        let oImgLength = oImg.length
        let Deg = 360 / oImgLength
        setTimeout(() => {
          for ( let i = 0; i < oImgLength; i++ ) {
            oImg[i].style.transform = 'rotateY('+ i * Deg +'deg) translateZ(350px)'
            oImg[i].style.transition = 'transform 1s ' + (oImgLength - 1 - i) * 0.1 + 's'
          }
        }, 200)
        
        this.mTop()
        window.onresize = this.mTop
        this.initEvent()
      },
      mTop () {
        let wH = document.documentElement.clientHeight
        this.oWrap.style.marginTop = wH / 2 - 180 + 'px'
      },
      initEvent () {
        let nowX , nowY , lastX , lastY , minusX = 0, minusY = 0
        let roY = 0 , roX = -10
        let timer
        // 拖拽：三个事件-按下 移动 抬起
        //按下
        let self = this
        let el = document.getElementById('select-screen')
        el.onmousedown = function(ev) {
          ev.stopPropagation()

          ev = ev || window.event

          //鼠标按下的时候，给前一点坐标赋值，为了避免第一次相减的时候出错
          lastX = ev.clientX
          lastY = ev.clientY
          
          //移动
          this.onmousemove = function(ev) {
            ev = ev || window.event

            clearInterval( timer )

            nowX = ev.clientX; // clientX 鼠标距离页面左边的距离
            nowY = ev.clientY; // clientY ………………………………顶部………………

            //当前坐标和前一点坐标差值
            minusX = nowX - lastX
            minusY = nowY - lastY
            
            //更新wrap的旋转角度，拖拽越快-> minus变化大 -> roY变化大 -> 旋转快
            // roY = roY + minusX*0.2
            roY += minusX * 0.2 
            roX -= minusY * 0.1

            self.oWrap.style.transform = 'rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
            
            //前一点的坐标
            lastX = nowX
            lastY = nowY
          }
          //抬起
          this.onmouseup = function() {
            this.onmousemove = null;
            timer = setInterval(function() {
              minusX *= 0.95
              minusY *= 0.95
              roY += minusX * 0.2
              roX -= minusY * 0.1
              self.oWrap.style.transform = 'rotateX('+ roX +'deg) rotateY('+ roY +'deg)'

              if ( Math.abs(minusX) < 0.1 && Math.abs( minusY ) < 0.1 )
              {
                clearInterval( timer )
              }
            }, 13)
          }
          return false
        }
      },
      selectScreenItem (item) {
        this.$emit('selectScreenItem', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
#select-screen {
    height: 100%;
    background:#66677c;
    overflow: hidden;
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background: rgba(0, 0, 0, 0.3);
//   z-index: 10000;
  #perspective {
    /*场景景深*/
    perspective: 800px;/*场景景深*/
    #wrap {
      position:relative;
      width:149px;
      height:200px;
      margin:150px auto 0;
      transform-style:preserve-3d;/*当前元素3D效果*/
      transform:rotateX(-20deg) rotateY(0deg);
      img {
        width:149px;
        height:200px;
        position:absolute;
        /*倒影设置*/
        -webkit-box-reflect:below 10px -webkit-linear-gradient(top,rgba(0,0,0,0) 50%,rgba(0,0,0,0.5) 100%);
        cursor:pointer;
        -moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius:5px;
        box-shadow:0 0 20px #FFF;
        /*背景渐变效果！important*/
        -webkit-box-reflect:below 10px
        -webkit-linear-gradient(top,rgba(0,0,0,0) 80%,rgba(0,0,0,1) 100%);
      }
    }
  }
}
</style>