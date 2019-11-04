import VueRouter from 'vue-router'

import homeContainer from "./components/tabbar/homeContainer.vue"
import memberContainer from "./components/tabbar/memberContainer.vue"
import searchContainer from "./components/tabbar/searchContainer.vue"
import shopCartContainer from "./components/tabbar/shopCartContainer.vue"

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: "/", redirect: "/home"},
    {path: "/home", component: homeContainer},
    {path: "/member", component: memberContainer},
    {path: "/shopcart", component: shopCartContainer},
    {path: "/search", component: searchContainer}
  ],
  linkActiveClass: "mui-active"
})

// 把路由对象暴露出去
export default router