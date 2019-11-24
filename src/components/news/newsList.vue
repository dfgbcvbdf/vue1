<template>
     <div class="nl-c">
         <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.id">
					<router-link :to="{path: '/home/newsinfo', query: {id: item.id}}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{item.add_time | dateFormat}}</span>
                                <span>点击：{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
				
			</ul>
     </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            newList: []
        }
    },
    methods: {
        getList() {
            this.$http.jsonp("api/getnewslist").then(result => {
                if(result.body.status === 0){
                    this.newList = result.body.message;
                     Toast("加载ok");
                } else {
                    Toast("加载失败");
                }
            });
        }
    },
    created() {
        this.getList();
    },
}
</script>

<style lang="less" scoped>
    .nl-c {
        li {
            h1 {
            font-size: 14px;
            }
            .mui-ellipsis {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #226aff;
            }
        
        }
        
    }
</style>