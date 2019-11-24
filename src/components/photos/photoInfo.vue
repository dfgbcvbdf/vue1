<template>
     <div class="pi-container">
         <h3 class="pi-title" v-text="info.title"></h3>
         <p class="pi-body">
             <span class="pi-body-time">发表时间：{{info.add_time | dateFormat}}</span> <!-- 过滤器在v-html里面不好使，要用差值表达式 -->
             <span class="pi-body-clicks">点击：{{info.click}}次</span>
         </p>
         <hr>
         <div class="thumbs"><!-- 缩略图区域 -->
             <!-- slides后面是缩略图数组名称，handleClose是关闭缩略图后执行的方法 -->
             <vue-preview :slides="thumbs" @close="handleClose"></vue-preview> 
         </div>
         <div class="pi-content">
             {{info.content}}
         </div>

         <!-- 放置一个现成的 评论子组件 -->
         <mycomment :newsId="this.id"></mycomment>

     </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";

export default {
    data() {
        return {
            id: this.$route.query.id,
            info: {},  /* 图片信息 */
            thumbs: []  /* 缩略图数组 */
        }
    },
    methods: {
        getInfo() {
            this.$http
                .jsonp("api/getimageInfo?imgid=" + this.id)
                .then(result => {
                    if (result.body.status === "0") {
                        this.info = result.body.message[0];
                        //Toast("图片信息加载ok");
                    } else {
                        Toast("图片信息加载失败");
                    }
                });
        },
        getThumbs() {
            this.$http
                .jsonp("api/getthumimages?imgid=" + this.id)
                .then(result => {
                    if (result.body.status === "0") {
                        result.body.message.forEach(element => {
                            element.msrc = element.src; // 新版多个msrc，缩略图地址，src是原图地址，用一样的也可以
                            element.w = 600;// 循环每个图片数据，补全图片的宽和高
                            element.h = 400;
                            element.title = this.info.title;//图片标题
                        });
                        this.thumbs = result.body.message;
                        //Toast("图片缩略图加载ok");
                    } else {
                        Toast("图片缩略图加载失败");
                    }
                });
        },
        handleClose() {
            console.log("缩略图关闭了");
        }
    },
    created() {
        this.getInfo();
        this. getThumbs();
    },
    components: {
        mycomment: comment
    }
}
</script>

<style lang="less" scoped>
    .pi-container {
        padding: 3px;
        .pi-title {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .pi-body {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .pi-content {
            font-size: 13px;
            line-height: 30px;
        }


                /*  //这是无法穿透的写法
        .thumbs{
            img{
            margin: 10px;
            box-shadow: 0 0 8px #999;
            }
        }
        */

        /* vue引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时只能通过>>>，穿透scoped。
        有些Sass 之类的预处理器无法正确解析 >>>。可以使用 /deep/ 操作符( >>> 的别名) */
        .thumbs {
            /deep/ .my-gallery {
                display: flex;
                flex-wrap: wrap;
                figure {
                    width: 30%;
                    margin: 5px;
                    img {
                        width: 100%;
                        box-shadow: 0 0 8px #999;
                    }
                }
            }
        }
    }
</style>