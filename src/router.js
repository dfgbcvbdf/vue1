import VueRouter from 'vue-router'

import homeContainer from "./components/tabbar/homeContainer.vue"
import memberContainer from "./components/tabbar/memberContainer.vue"
import searchContainer from "./components/tabbar/searchContainer.vue"
import shopCartContainer from "./components/tabbar/shopCartContainer.vue"
import newsList from "./components/news/newsList.vue"
import newsInfo from "./components/news/newsInfo.vue"
import photoList from "./components/photos/photoList.vue"
import photoInfo from "./components/photos/photoInfo.vue"
import goodsList from "./components/goods/goodsList.vue"
import goodsInfo from "./components/goods/goodsInfo.vue"
import goodsDesc from "./components/goods/goodsDesc.vue"
import goodsComment from "./components/goods/goodsComment.vue"

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: "/", redirect: "/home"},
    {path: "/home", component: homeContainer},
    {path: "/member", component: memberContainer},
    {path: "/shopcart", component: shopCartContainer},
    {path: "/search", component: searchContainer},
    {path: "/home/newslist", component: newsList},
    {path: "/home/newsinfo", component: newsInfo},
    {path: "/home/photolist", component: photoList},
    {path: "/home/photoinfo", component: photoInfo},
    {path: "/home/goodslist", component: goodsList},
    {path: "/home/goodsinfo", component: goodsInfo},
    {path: "/home/goodsdesc", component: goodsDesc},
    {path: "/home/goodscomment", component: goodsComment}
  ],
  linkActiveClass: "mui-active"
})

// 把路由对象暴露出去
export default router