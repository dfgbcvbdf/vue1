<template>
    <div class="app-container">
        <mt-header fixed title="固定在顶部">
                <mt-button icon="back" slot="left" @click="$router.back(-1)" v-show="showFlag">返回</mt-button>
        </mt-header>
				<transition>  <!-- 组件的整体过渡动画标签在这里添加，不要添加到组件文件内 -->
					<router-view></router-view>
				</transition>
        
				<nav class="mui-bar mui-bar-tab">
						<router-link class="mui-tab-item" to="/home">
						<span class="mui-icon mui-icon-home"></span>
						<span class="mui-tab-label">首页</span>
					</router-link>
					<router-link class="mui-tab-item" to="/member">
						<span class="mui-icon mui-icon-contact"></span>
						<span class="mui-tab-label">会员</span>
					</router-link>
					<router-link class="mui-tab-item" to="/shopcart">
						<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{this.$store.getters.getAllCounts}}</span></span><!-- 绑定vuex getters 中的方法获取数值，自动更新，getters后面的是属性，不要加（）；绑定到data中不会自动更新，直接绑定这里 -->
						<span class="mui-tab-label">购物车</span>
					</router-link>
					<router-link class="mui-tab-item" to="/search">
						<span class="mui-icon mui-icon-search"></span>
						<span class="mui-tab-label">搜索</span>
					</router-link>
				</nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showFlag: false,  //是否显示返回按钮
            }
        },
        watch: {
            "$route.path": function(now, old) {  //监测路由是否为主页，是的话隐藏返回按钮, 监听属性的话，方法名要成字符串
                if(now=="/home"){
                    this.showFlag=false;
                } else{
                    this.showFlag=true;
                }
            }
        },
        created() {
            this.showFlag = this.$route.path == "/home" ? false : true; //确保在非首页刷新后，返回按钮正常
        }
    }
</script>

<style lang="less" scoped>
    .app-container {
		padding-top: 40px;
        overflow-x: hidden;
        padding-bottom: 50px;
	}
	
	.v-enter{
     	opacity: 0;
    transform: translateX(100%);
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		
	}

	.v-enter-active,
    .v-leave-active{
	  transition: all .8s ease;
	}
	 .v-leave-active{
	  position: absolute; /* 设置后，不会上下乱浮动*/
    }
    
    * { touch-action: none; }  /* 去掉chrome的警告提示*/
</style>