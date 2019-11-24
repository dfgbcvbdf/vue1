<template>
     <div class="gd-container">
         <h3>{{info.title}}</h3>
         <hr>
         <div class="icontent" v-html="info.content"></div>
     </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    methods: {
        getDesc() {
            this.$http
                .jsonp("api/goods/getdesc?id=" + this.$route.query.id)
                .then(result => {
                    if (result.body.status == "0") {
                        this.info = result.body.message[0];
                        Toast("商品信息加载ok");
                    } else {
                        Toast("商品信息加载失败");
                    }
                });
        }
    },
    data() {
        return {
            info: {}
        }
    },
    created() {
        this.getDesc();
    },
}
</script>

<style lang="less">
    .gd-container {
        padding: 4px;
        h3 {
            font-size: 16px;
            color: blue;
            text-align: center;
            margin: 20px 0;
        }
        div.icontent {
            img {
                width: 100%;
            }
        }
    }
</style>