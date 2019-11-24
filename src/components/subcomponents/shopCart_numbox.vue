<template>
    <div class="mui-numbox" data-numbox-min='1'> 
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="count"  ref="numbox" @change="getChange"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    mounted() {
        mui(".mui-numbox").numbox();// 初始化数字选择框组件
    },
    methods: {
        getChange() { // 每当 文本框的数据被修改的时候，立即把 最新的数据
            this.$emit("changeCount", {count: parseInt(this.$refs.numbox.value), id: this.id});//refs有带s
        }
    },
    props:["count", "id"]
    
}
</script>

<style lang="less" scoped>

</style>