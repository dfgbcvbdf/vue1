<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgList" :key="item.id"> <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
                <img :src="item.img"><!-- img 中正确使用src的方法-->
            </mt-swipe-item>
        </mt-swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu1.png">
		                    <div class="mui-media-body">新闻资讯</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu2.png">
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu3.png">
		                    <div class="mui-media-body">商品购买</div></a></li>
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

export default {
    data() {
        return {imgList: []};
    },
    methods: {
        getImgList: function() {
            this.$http.jsonp('http://vue.com:6661/getjsonp').then(res => {
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
    }
    
    


}
</script>

<style lang="less" scoped>
    .mint-swipe {
        height: 200px;

        .mint-swipe-item{
            img {
                height: 100%;
                width: 100%;
            }
        }
    }

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