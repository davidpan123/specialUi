<template>
  <div id="app">
    <!-- <TestFlyLine/> -->
    <!-- <TestLoading/> -->
    <!-- <TestRingChart/> -->
    <!-- <TestFlowChart/> -->
    <!-- <TestDashChart/> -->
    <TestDashRatioChart/>
  </div>
</template>

<script>
import TestFlyLine from './components/TestFlyLine.vue'
import TestLoading from './components/TestLoading.vue'
import TestRingChart from './components/TestRingChart.vue'
import TestFlowChart from './components/TestFlowChart.vue'
import TestPhotoWall from './components/TestPhotoWall.vue'
import TestDashChart from './components/TestDashChart.vue'
import TestDashRatioChart from './components/TestDashRatioChart.vue'
export default {
  name: 'App',
  components: { 
    TestFlyLine,
    TestLoading,
    TestRingChart,
    TestDashChart,
    TestDashRatioChart
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /* background: #202020; */
}
</style>
