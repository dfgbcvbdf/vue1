<template>
    <div>
        <swiper :imgList="imgList" :isFull="isFull"></swiper>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../images/menu1.png">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../images/menu2.png">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../images/menu3.png">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/menu4.png">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu5.png">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu6.png">
		                    <div class="mui-media-body">联系我们</div></a></li>
		           
		        </ul> 
    </div>
    
    
</template>

<script>
import { Toast } from 'mint-ui';
import swiper from "../subcomponents/swiper.vue"
export default {
    data() {
        return {
            imgList: [],
            isFull: true
        };
    },
    methods: {
        getImgList: function() {
            this.$http.jsonp('getjsonp').then(res => {
                if(res.body.status === 0) {
                    this.imgList = res.body.message;
                     Toast("加载ok");
                }else {
                    Toast("加载失败");
                }
            });
        }
    },
    created() {
        this.getImgList();
    },
    components: {
        swiper
    }
    
}
</script>

<style lang="less" scoped>
    .mui-grid-view.mui-grid-9 {
        background-color: white;
        border: none;

        li {
            border: none;
            img {
                height: 60px;
                width: 60px;
            }
            .mui-media-body {
                font-size: 13px;
            }
            
        }

        
    }

    
</style>