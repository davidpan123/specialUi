<template>
<div class="container">
    <dash-ratio-chart :width="600" :raduis="2" :dataset="dataset"/>
</div>
</template>

<script>
export default {
    data () {
        return {
            dataset:  [
                {
                    num: 300,
                    color: '#66FF99'
                },
                {
                    num: 200,
                    color: '#F1E541'
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>