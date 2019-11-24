<template>
    <div class="nt-c">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发布时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击：{{newsInfo.click}}次</span>
        </p>
        <hr />
        <div class="newsContent" v-html="newsInfo.content"></div>
        <mycomment :newsId="this.id"></mycomment>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";

export default {
    data() {
        return {
            id: this.$route.query.id, //这里时$route不是$router！！！！
            newsInfo: {}
        };
    },
    methods: {
        getNewsInfo() {
            this.$http
                .jsonp("api/getnew?id=" + this.id)
                .then(result => {
                    if (result.body.status === 0) {
                        this.newsInfo = result.body.message[0];
                        //Toast("新闻加载ok");
                    } else {
                        Toast("新闻加载失败");
                    }
                });
        }
    },
    mounted() {
        this.getNewsInfo();
    },
    components: {
        mycomment: comment
    }
};
</script>

<style lang="less">
.nt-c {
    padding: 0px 4px;
    .title {
        font-size: 16px;
        color: red;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #226aff;
    }
    .newsContent {
        img {
            width: 100%;
        }
    }
}
</style>