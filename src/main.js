
import Vue from 'vue'
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)


// 导入 自定义路由模块
import router from './router.js'

import { Header, Swipe, SwipeItem} from 'mint-ui'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

import './lib/mui/css/mui.min.css'
import "./lib/mui/css/icons-extra.css"

import app from "./App.vue"// 导入 app 组件

var vue = new Vue({
        el: "#app",
        render: ce => ce(app),// render 会把 el 指定的容器中，所有的内容都清空覆盖，所以 不要 把 路由的 router-view 和 router-link 直接写到 el 
        router// 4. 将路由对象挂载到 vm 上
});








