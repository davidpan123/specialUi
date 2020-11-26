<template>
<div class="container">
    <gradient-dash-progress :width="600" :raduis="2" :total="total" :num="num"/>
</div>
</template>

<script>
export default {
    data () {
        return {
            num: 20,
            total: 100
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30px;
  height: 100%;
}
</style>