<template>
<div class="container">
    <gradient-dash-chart
        :direction="'y'"
        :dataset="dataset"
        :axisArr="axisArr"
        :width="770"
        :height="400"
        :axisNum="config.axisNum"
        :tickSizeInner="config.tickSizeInner"
        :axisColor="config.axisColor"
        :xAxisTextSize="config.xAxisTextSize"
        :yAxisTextSize="config.yAxisTextSize"
        :axisTextColor="config.axisTextColor"
        :textStyle="config.textStyle"
        :dash="config.dash"
        :padding="config.padding"/>
</div>
</template>

<script>
export default {
    data () {
        return {
            dataset: [22, 40, 60, 80, 45, 32, 18],
            axisArr: ['06-01', '06-02', '06-03', '06-04', '06-05', '06-06', '06-07'],
            config: {
                dash: [30, 10, 5],
                padding: {
                    top: 5,
                    bottom: 35,
                    left: 70,
                    right: 0
                },
                axisNum: 4,
                axisColor: '#0B4665',
                xAxisTextSize: '24px',
                yAxisTextSize: '18px',
                tickSizeInner: 3,
                axisTextColor: '#276F99',
                textStyle: {
                    fontSize: '24px',
                    color: '#E6FFEF',
                    dx: 0,
                    dy: -20
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>