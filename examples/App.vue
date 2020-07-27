<template>
  <div id="app">
    <fly-line :lines="flyPoints"></fly-line>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      flyPoints: [
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
    }
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
}
</style>
