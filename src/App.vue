<template>
    <div class="app-container">
        <mt-header fixed title="固定在顶部"></mt-header>
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
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
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

</script>

<style lang="less" scoped>
    .app-container {
		padding-top: 40px;
		overflow-x: hidden;
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
</style>