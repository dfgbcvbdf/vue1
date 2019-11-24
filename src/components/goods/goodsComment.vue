<template>
    <comment :newsId = "this.$route.query.id"></comment>
</template>

<script>
import comment from "../subcomponents/comment.vue"
export default {
    components: {
        comment
    }
}
</script>

<style lang="less" scoped>

</style>