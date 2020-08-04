<template>
<div class="container">
    <dash-chart :dataset="dataset" :xAxisArr="xAxisArr"/>
</div>
</template>

<script>
export default {
    data () {
        return {
            dataset: [10, 20, 30, 23, 13, 40, 27],
            xAxisArr: ['06-01', '06-02', '06-03', '06-04', '06-05', '06-06', '06-07']
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>