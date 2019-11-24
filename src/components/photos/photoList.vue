<template>
     <div class="pl-container">
         <!-- 顶部滑动条区域 -->
         <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll"> <!-- vue操作样式里面是字符串.下面的cateId如果加this就不显示？-->
                <a :class="['mui-control-item', item.id == cateId? 'mui-active': '']" v-for="item in allCategory" :key="item.id" @tap="getListById(item.id)">{{item.title}}</a>
            </div>
        </div>

         <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photoinfo?id='+ item.id">
                <img v-lazy="item.img_url">  <!-- 懒加载图片 -->
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>

     </div>
</template>

<script>
import { Toast } from "mint-ui";

// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js"

export default {
    data() {
        return {
           list: [],// 图片列表的数组
           allCategory: [],// 所有分类的列表数组
           cateId: "0"  //当前选择的分类id，默认为全部 0
        }
    },
    methods: {
        getAllCategory() {
            this.$http
                .jsonp("api/getimgcategory")
                .then(result => {
                    if (result.body.status === "0") {
                        // 手动拼接出一个最完整的 分类列表 全部 0
                        result.body.message.unshift({title: "全部", id: "0"})
                        this.allCategory = result.body.message;
                        //Toast("分类加载ok");
                    } else {
                        Toast("分类加载失败");
                    }
                });
        },
        getListById(id) {
            this.cateId = id.toString();
            this.$http
                .jsonp("api/getimages?cateid="+ id)
                .then(result => {
                    if (result.body.status === "0") {
                        this.list = result.body.message;
                        //Toast("列表加载ok");
                    } else {
                        Toast("列表加载失败");
                    }
                });
        }
    },
    created() {
        this.getAllCategory();//this不要忘记了。。。
        this.getListById("0");// 默认进入页面，就主动请求 所有图片列表的数据
    },
    mounted() {
        // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
        // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
        //初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            scrollY: false, //是否竖向滚动
            scrollX:true, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration:0.0001, //阻尼系数,系数越小滑动越灵敏
            bounce: false //是否启用回弹

            });
    },
}
</script>

<style lang="less" scoped>
    * {
        touch-action: pan-y;
    }
    .pl-container {
        .photo-list { 
            padding: 10px;
            margin: 0;
            padding-bottom: 0;
            li {
                position: relative;  
                list-style: none;
                width: 100%;
                text-align: center;
                box-shadow: 0 0 9px #999;
                margin-bottom: 10px;
                img {
                    width: 100%;
                    vertical-align: middle;  /* 图片垂直对齐 */
                }
                image[lazy=loading] { /* 懒加载图片必须样式 */ 
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }

                .info {
                    position: absolute;   /* 摘要绝对对齐，父类相对对齐 */
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.4);  /* 图片摘要半透明背景 */
                    max-height: 84px;
                    color: white;
                    width: 100%;
                    text-align: left;
                    .info-title {
                        font-size: 14px;
                    }
                    .info-body {
                        font-size: 13px;
                    }
                }
                
            }
            
        }
        
    }
    
</style>