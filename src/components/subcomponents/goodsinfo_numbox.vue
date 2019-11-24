<template>
    <!-- 问题： 我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 -->
    <!-- 我们可以 使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值 -->
    <div class="mui-numbox" data-numbox-min='1'> <!-- 组件标签无法动态改变数值要用组件自带的js方法设置最大值 -->
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1"  ref="numbox" @change="getChange"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    mounted() {
        mui(".mui-numbox").numbox();// 初始化数字选择框组件
    },
    props: ["max"],
    methods: {
        getChange() { // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
            this.$emit("getCount", parseInt(this.$refs.numbox.value));//refs有带s
        }
    },
    watch: {
        "max": function(newVal, oldVal) { // 属性监听
            mui(".mui-numbox").numbox().setOption('max',newVal);// 使用 JS API 设置 numbox 的最大值
        }
    },
}
</script>

<style lang="less" scoped>

</style>