<template>
    <div class="ring-dash" ref="ringDash"></div>
</template>
<script>
import RingDash from './ringDash'

export default {
    name: 'RingChart',
    props: {
        config: {
            type: Object,
            default() {
                return {}
            }
        },
        num: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        r: {
            type: Number,
            default: 300
        },
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    mounted () {
        this.config.el = this.$refs['ringDash']
        this.config.width = this.r
        this.config.height = this.r
        this.config.num = this.num
        this.config.total = this.total
        this.config.title = this.title
        this.config.subTitle = this.subTitle
        new RingDash(this.config)
    }
}
</script>
<style lang="scss">
    @keyframes rotate {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .point-monocyclic{
        animation: rotate 6s ease-out infinite;
        transform-origin: center;
    }
</style>
