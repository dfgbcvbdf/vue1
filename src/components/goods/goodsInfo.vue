<template>
     <div class="good-info-container">
         <transition @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
         >
             <div class="ball" v-show="ballShow" ref="ball"></div>
         </transition>
         
         
         <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :imgList="imgList" :isFull="isFull"></swiper>
                </div>
            </div>
		</div>

        <div class="mui-card">
            <div class="mui-card-header">
                {{goodsInfo.title}}
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        <span class="market">市场价：<del>￥{{goodsInfo.market_price}}</del></span>
                        <span>销售价：￥<span class="now">{{goodsInfo.sell_price}}</span></span>
                    </p>
                    <div class="num">
                        购买数量：<numbox @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox>
                        
                    </div>
                    <p class="do">
                        <mt-button size="small" type="primary">立即购买</mt-button>
                        <mt-button size="small" type="danger" @click="toCart">加入购物车</mt-button>
                    </p>
                    <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
                    <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
                    <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
                    <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
                    <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
                </div>
            </div>
		</div>

        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsInfo.goods_no}}</p>
                        <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                        <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="desc">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="comment">商品评论</mt-button>
                </div>
			</div>
     </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue"
import numbox from "../subcomponents/goodsinfo_numbox.vue"

export default {
    data() {
        return {
            goodsInfo: {},
            id: this.$route.query.id,
            imgList: [],
            isFull: false,
            selectedCount: 1,
            ballShow: false
        }
    },
    methods: {
        getInfo() {
            this.$http
                .jsonp("api/goods/getinfo?id=" + this.id)
                .then(result => {
                    if (result.body.status == "0") {
                        this.goodsInfo = result.body.message[0];
                        Toast("商品信息加载ok");
                    } else {
                        Toast("商品信息加载失败");
                    }
                });
        },
        getThumimages() {
            this.$http
                .jsonp("api/getthumimages?imgid=" + this.id)
                .then(result => {
                    if (result.body.status == 0) {
                        result.body.message.forEach(element => {
                            element.msrc = element.src; // 新版多个msrc，缩略图地址，src是原图地址，用一样的也可以
                            element.w = 600;// 循环每个图片数据，补全图片的宽和高
                            element.h = 400;
                            element.img = element.src;//这里和首页轮播图的属性名不同
                        });
                        this.imgList = result.body.message;
                        Toast("图片加载ok");
                    } else {
                        Toast("图片加载失败");
                    }
                });
        },
        desc() {
            this.$router.push("/home/goodsdesc?id="+ this.id);
        },
        comment() {
            this.$router.push("/home/goodscomment?id="+ this.id);
        },
        getSelectedCount(count) {
            this.selectedCount = count;
            console.log("父组件收到--"+ count);
        },
        toCart() {
            this.ballShow = !this.ballShow;
            this.$store.commit("addToCart", {     //调用vuex mutations中的方法
                id: this.id,
                count: this.selectedCount,
                price: this.goodsInfo.sell_price,
                selected: true
            });
        },
        beforeEnter() {
            this.$refs.ball.style.transform = "translate(0, 0)";
             
        },
        enter() {
            // 这句话，没有实际的作用，但是，如果不写，出不来动画效果；
            // 可以认为 el.offsetWidth( this.$refs.ball) 会强制动画刷新
            this.$refs.ball.offsetWidth;
            /* getBoundingClientRect方法返回元素的大小及其相对于视口的位置。返回对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。 */
            // 小球动画优化思路：
            // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
            // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
            // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
            // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
            // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

            // 获取小球的 在页面中的位置
            var ballPosition = this.$refs.ball.getBoundingClientRect();
            var badgePosition = document.getElementById("badge").getBoundingClientRect();
            var xDist = badgePosition.left - ballPosition.left;
            var yDist = badgePosition.top - ballPosition.top;
            // enter 表示动画 开始之后的样式，这里，可以设置小球完成动画之后的，结束状态
            this.$refs.ball.style.transform = `translate(${xDist}px,${yDist}px)`;
            this.$refs.ball.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
            done();// 这里的 done， 起始就是 afterEnter 这个函数，也就是说：done 是 afterEnter 函数的引用
        },
        afterEnter() {
            this.ballShow = !this.ballShow;
        }
    },
    created() {
        this.getThumimages();
        this.getInfo();
    },
    components: {
        swiper,
        numbox
    }
}
</script>

<style lang="less" scoped>
    .good-info-container {
        background-color: #eee;
        overflow: hidden;
        .mui-card-content {
        .price {
            .market {
                margin-right: 10px;
            }
            .now {
            font-size: 16px;
            color: red;
            font-weight: bold;
            }   
        }
        .num {
            margin-bottom: 10px;
            color: #8f8f94;
        }
        .do {
            margin-bottom: 0;
        }
        
        }
        .mui-card-footer {
            display: block;
            button {
                margin: 15px 0;
            }
        }
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 390px;
            left: 146px;
        }
    }
    

    
    
</style>