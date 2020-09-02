<template>
<div class="container">
    <dash-ratio-chart :width="620" :raduis="2" :dataset="dataset"/>
</div>
</template>

<script>
export default {
    data () {
        return {
            // dataset:  [
            //     {
            //         num: 300,
            //         color: '#66FF99'
            //     },
            //     {
            //         num: 200,
            //         color: '#F1E541'
            //     }
            // ]
            dataset:  [
                {
                    num: 40,
                    color: '#2ba0c5'
                },
                {
                    num: 1,
                    color: '#FFC64A'
                },
                {
                    num: 1,
                    color: '#445AD9'
                },
                {
                    num: 1,
                    color: '#46C999'
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