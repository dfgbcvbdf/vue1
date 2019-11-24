<template>
    <div class="sc-container">
        <div class="mui-card" v-for="(item) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">    
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSwitch(item.id)"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="right">
                        <h3>{{item.title}}</h3>
                        <p>
                            <span>￥{{item.sell_price}}</span>
                            <numbox @changeCount="changeCount" :count="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                            <a @click.prevent="delGoods(item.id)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
		</div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner amount">
                    <div class="left1">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span>{{$store.getters.getSelectedCountAndAmount.count}}</span>件，总价&nbsp;<span>￥{{$store.getters.getSelectedCountAndAmount.amount}}</span></p>
                    </div>
                    <div class="right1">  
                        <mt-button type="danger" >去结算</mt-button>
                    </div>
                </div>
            </div>
		</div>
    </div>
     
</template>

<script>
import { Toast } from "mint-ui";
import numbox from "../subcomponents/shopCart_numbox.vue"
export default {
    data() {
        return {
            goodsList: []
        }
    },
    methods: {
        getGoodsList() {
            this.$http
                .jsonp("api/goods/getshopcarlist?ids=" + this.$store.getters.getAllIds)
                .then(result => {
                    if (result.body.status == "0") {
                        this.goodsList = result.body.message;
                        Toast("购物车信息加载ok");
                    } else {
                        Toast("购物车信息加载失败");
                    }
                });
        },
        changeCount(info) {
            this.$store.commit("updateGoodsCount", info);
        },
        changeSwitch(id) {
            this.$store.commit("updateGoodsSelected", {
                id: id,
                selected: this.$store.getters.getGoodsSelected[id]
            });
        },
        delGoods(id) {
            this.goodsList.some((item, i) => {
                if(item.id == id) {
                     this.goodsList.splice(i, 1);
                     return true;
                }
            });
            this.$store.commit("delGoods", id);
        }
    },
    created() {
        this.getGoodsList();
    },
    components: {
        numbox
    }
    
}
</script>

<style lang="less" scoped>
    .sc-container {
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner {
            img {
                width: 60px;
                height: 60px;
            }
            .right {
                h3 {
                    font-size: 13px;
                }
                p {
                    margin-bottom: 0;
                    margin-top: 15px;
                    span {
                        color: red;
                        font-weight: bold;
                        margin-right: 10px;
                    }
                    .mui-numbox {
                        height: 25px;
                    }
                }
                
            }
            
            display: flex;
            align-items: center;
        }

        .amount {
            display: flex;
            justify-content: space-between;
            .left1 {
                span {
                    color: red;
                    font-size: 15px;
                    font-weight: bold;
                }
                
            }
        }
    }
</style>