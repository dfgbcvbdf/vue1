<template>
     <div class="gl-container">
         <!-- 在网页中，有两种跳转方式： -->
        <!-- 方式1： 使用 a 标签 的形式叫做 标签跳转  -->
        <!-- 方式2： 使用 window.location.href 的形式，叫做 编程式导航 -->
         <div class="gl-item" v-for="item in goodsList" :key="item.id" @click="getInfo(item.id)">
             <img :src="item.img_url">
             <h3>{{item.title}}</h3>
             <div class="info">
                 <p class="price">
                     <span>￥{{item.sell_price}}</span>
                     <del>￥{{item.market_price}}</del>
                 </p>
                 <p class="sell">
                     <span>热卖中</span>
                     <span class="stock">剩{{item.stock_quantity}}件</span>
                 </p>
             </div>
         </div>
         <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
     </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            pageindex: 1,  // 分页的页数
            goodsList: []  // 存放商品列表的数组
        }
    },
    methods: {
        getList() {// 获取商品列表
            this.$http
                .jsonp("api/getgoods?pageindex=" + this.pageindex)
                .then(result => {
                    if (result.body.status == "0") {
                        //每次只取回分页固定的数量，所以每次要拼接数组，不能直接赋值
                        this.goodsList = this.goodsList.concat(result.body.message);
                        Toast("列表加载ok");
                    } else {
                        Toast("列表加载失败");
                    }
                });
        },
        getMore() {
            this.pageindex++;
            this.getList();
        },
        getInfo(id) {
            // 使用JS的形式进行路由导航
            // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
            // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
            // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址
             // 1. 最简单的
            // this.$router.push("/home/goodsinfo/" + id);
            // 2. 传递对象
            // this.$router.push({ path: "/home/goodsinfo/" + id });
            // 3. 传递命名的路由
            /* this.$router.push({ name: "goodsinfo", params: { id } }); //name要在路由文件里设置对应的 */
            // 4.带查询参数，变成 /register?plan=private
            /* router.push({ path: 'register', query: { plan: 'private' }}) */
            
             this.$router.push("/home/goodsinfo?id="+ id);
        }
    },
    created() {
        this.getList();
    }
}
</script>

<style lang="less" scoped>
    .gl-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 7px;
        .gl-item {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            min-height: 293px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img {
                width: 100%;

            }
            h3 {
                font-size: 14px;
            }
            .info {
                background-color: #eee;
                p{
                    padding: 5px;
                    margin: 0;
                }
                .price {
                    
                    span {
                        color: red;
                        font-weight:bold; 
                        font-size: 16px;
                    }
                    del {
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>