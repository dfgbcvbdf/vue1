
import Vue from 'vue';
// 导入 vue-router 包
import VueRouter from 'vue-router';
//  手动安装 VueRouter 
Vue.use(VueRouter);

//导入vue-resource用于ajax
import VueResource from 'vue-resource';
Vue.use(VueResource);

//加上这个才能启用浏览器调试插件
Vue.config.devtools = true;

//vuex开始
// 配置vuex的步骤
// 1. 运行 cnpm i vuex -S 
// 2. 导入包
import Vuex from 'vuex'
// 3. 注册vuex到vue中
Vue.use(Vuex)
// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem("cart") || "[]");  //后面的空数组要加个引号，不然json方法会报错
// 4. new Vuex.Store() 实例，得到一个 数据仓储对象
var store = new Vuex.Store({
    state: {
        cart: car // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations: {
        addToCart(state, info) {
            var flag = false;
            state.cart.some(item => {
                if(item.id == info.id) {
                    item.count += info.count;
                    flag = true;
                    return true;
                }
            });
            if(!flag) {
                state.cart.push(info);
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        updateGoodsCount(state, info) {
            state.cart.some(item => {
                if(item.id == info.id) {
                    item.count = info.count;
                    return true;
                }
            });
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        updateGoodsSelected(state, info) {
            state.cart.some(item => {   //查找单个，使用some替代foeeach提高效率
                if(item.id == info.id) {
                    item.selected = info.selected;
                    return true;
                }
            });
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        delGoods(state, id) {
            state.cart.some((item, i) => {
                if(item.id == id) {
                    state.cart.splice(i, 1);
                    return true;
                }
                
            });
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
        
    },
    getters: {
        getAllCounts(state) {
            var c = 0;
            state.cart.forEach(item => {
                c += item.count;
            });
            return c;
        },
        getAllIds(state) {
            var ids = [];
            state.cart.forEach(item => {
                ids.push(item.id);
            });
            var t = ids.join(",");
            return t;
        },
        getGoodsSelected(state) {
            var temp= [];
            state.cart.forEach(item => {
                temp[item.id] = item.selected;
            });
            return temp;
        },
        getGoodsCount(state) {
            var temp= [];
            state.cart.forEach(item => {
                temp[item.id] = item.count;
            });
            return temp;
        },
        getSelectedCountAndAmount(state) {
            var temp ={
                count: 0,
                amount: 0
            }
            state.cart.forEach(item => {
                if(item.selected) {
                    temp.count += item.count;
                    temp.amount += item.count * item.price;
                }
            });
            return temp;
        }

    }
});
Vue.config.devtools = true;

//导入moment格式化日期用
import moment from "moment";
//将moment注册为全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {  
    return moment(dataStr).format(pattern);
});

Vue.http.options.emulateJSON = true;  //指定post提交的编码类型为 application/x-www-form-urlencoded  

// 如果我们通过全局配置了，请求的数据接口 根域名，则 ，在每次单独发起 http 请求的时候，请求的 url 路径，应该以相对路径开头，前面不能带 /  ，否则 不会启用根路径做拼接；
Vue.http.options.root = 'http://192.168.2.247:3003/';

// 导入 自定义路由模块
import router from './router.js';

//按需导入mintui包
import { Header, Swipe, SwipeItem, Button, Lazyload  } from 'mint-ui';

//并注册
/* Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.use(Lazyload); */
//mintui的懒加载按需导入使用会有问题，所以要全部导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
//并导入mint的样式
import 'mint-ui/lib/style.css'

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入mui css文件
import './lib/mui/css/mui.min.css';
import "./lib/mui/css/icons-extra.css";



import app from "./App.vue";  // 导入 app 组件

var vue = new Vue({
        el: "#app",
        render: ce => ce(app),// render 会把 el 指定的容器中，所有的内容都清空覆盖，所以 不要 把 路由的 router-view 和 router-link 直接写到 el 
        router,// 4. 将路由对象挂载到 vm 上
        store
});








