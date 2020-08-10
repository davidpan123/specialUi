<template>
<div class="container">
    <flash-marker :width="1920" :height="1080" :dataset="dataset" @clickIndex="clickIndex"/>
</div>
</template>

<script>
export default {
    data () {
        return {
            dataset:  [
                {
                    position: {x: 300, y: 300},
                    color: '#5070FF',
                    type: 'circle',
                    speed: 0.2
                },
                {

                    position: {x: 350, y: 300},
                    color: '#6EE7FF',
                    type: 'ellipse',
                    speed: 0.3,
                    max: 40,
                },
                {
                    position: {x: 400, y: 300},
                    color: '#90EE90',
                    type: 'circle',
                    speed: 0.45,
                }, {
                    position: {x: 950, y: 300},
                    color: '#f8983a',
                    type: 'circle',
                    speed: 0.9,
                    max: 100,
                }, 
                {
                    position: {x: 700, y: 300},
                    color: '#FAFA32',
                    type: 'ellipse',
                    speed: 1,
                    max: 100,
                }
            ]
        }
    },
    methods: {
        clickIndex (index) {
            console.log(index)
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>