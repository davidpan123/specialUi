<template>
  <div class="container">
    <ring-chart :r="500" :num="20" :total="100" :title="'占比'" :subTitle="'20%'" :config="config"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
          config: {
                ring: {
                    outDash: {
                        height: 10
                    },
                    progress: {
                        num: 60
                    }
                },
                text: {
                    title: {
                        fontSize: '28px',
                        color: '#ffffff'
                    }
                }
          }
      }
  }
}
</script>

<style>
.container {
  height: 100%;
}
</style>
