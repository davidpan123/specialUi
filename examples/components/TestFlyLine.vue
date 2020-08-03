<template>
  <div class="container">
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
          end: [600, 80],
          arcRadis: 0
        },
        {
          start: [829.3029054888133, 166.22157534665564],
          end: [1100, 80],
          arcRadis: -0.5
        }
      ]
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
</style>
