<template>
    <div id="vr_loading" v-if="loading">
        <div>
            <img src="./image/static_03.png"/>
        </div>
        <div>
            <img src="./image/static_bg.png"/>
        </div>
        <div class="rotate_bg">
            <img src="./image/rotate_bg.png"/>
        </div>
        <div class="rotate_orange">
            <img src="./image/rotate_orange.png"/>
        </div>
        <div class="uav_light">
            <img src="./image/uav_light.png"/>
        </div>
        <div class="uav_circle">
            <img src="./image/uav_circle.png"/>
        </div>
        <div class="uav_circle">
            <img src="./image/outer_circle.png"/>
        </div>
        <span class="uav_icon left_top">
            <img src="./image/left_top.png"/>
        </span>
        <span class="uav_icon left_bottom">
            <img src="./image/left_bottom.png"/>
        </span>
        <span class="uav_icon right_top">
            <img src="./image/right_top.png"/>
        </span>
        <span class="uav_icon right_bottom">
            <img src="./image/right_bottom.png"/>
        </span>
        <span class="uav_icon left_arrows">
            <img src="./image/left_arrows.png"/>
        </span>
        <span class="uav_icon right_arrows">
            <img src="./image/right_arrows.png"/>
        </span>
    </div>
</template>
<script>
export default {
    name: 'AirLoading',
    props: {
      loading: {
        type: Boolean,
        default: () => true
      }
    }
}
</script>
<style lang="scss" scoped>
#vr_loading {
  position: absolute;
  width: 382px;
  height: 382px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  div,
  .uav_icon {
    position: absolute;
    left: 0;
    top: 0;
  }
  .rotate_orange {
    animation: rotate 4s infinite linear;
  }
  .rotate_bg {
    animation: reverseRotate 4s infinite linear;
  }
  .uav_light {
    animation: floating 5s infinite linear;
  }
  .uav_circle {
    animation: reverseRotate 30s infinite linear;
  }
  div > img {
    width: 382px;
    height: 382px;
  }
  .left_top {
    top: 66px;
    left: 44px;
  }
  .left_top > img {
    animation: rotate 4s infinite linear;
  }
  .left_bottom {
    top: 272px;
    left: 14px;
  }
  .left_bottom > img {
    animation: rotate 4s infinite linear;
  }
  .right_top {
    top: 66px;
    left: 300px;
  }
  .right_top > img {
    animation: reverseRotate 4s infinite linear;
  }
  .right_bottom {
    top: 272px;
    left: 325px;
  }
  .right_bottom > img {
    animation: reverseRotate 4s infinite linear;
  }
  .left_arrows {
    left: 2px;
    top: 149px;
    animation: arrows_move 2s infinite linear;
    animation-direction: alternate;
  }
  .right_arrows {
    left: 369px;
    top: 149px;
    animation: arrows_move_right 2s infinite linear;
    animation-direction: alternate;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes reverseRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes floating {
    0%,
    100% {
      transform: translateY(5px);
      opacity: 0.4;
    }
    50% {
      transform: translateY(-5px);
      opacity: 1;
    }
  }
  @keyframes arrows_move {
    0% {
      transform: translate(12px, -42px) rotate(5deg);
    }
    50% {
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform: translate(-1px, 51px) rotate(-20deg);
    }
  }
  @keyframes arrows_move_right {
    0% {
      transform: translate(-12px, -42px) rotate(-5deg);
    }
    50% {
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform: translate(1px, 51px) rotate(20deg);
    }
  }
}
</style>
