import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/basic.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'


Vue.prototype.axios = axios
Vue.use(ElementUI);



//全局路由守卫
router.beforeEach((to, from, next) => {

  // 定义登录状态
  let isLogin;

  // 设置axios允许携带cookie
  axios.defaults.withCredentials = true;

  // 发送请求去检查用户是否登陆（是否有cookie)
  axios.get("http://127.0.0.1:3000/users/checkislogin").then(Response => {
    isLogin = Response.data.isLogin;
    if (isLogin) {
      //已经登陆
      // 放行
      next()
    } else {
      if (to.path == '/login') {
        next();
      } else{
        return next({
          "path": "/login"
        })
      }
    }
  })
})

Vue.filter("dataFormat", function (dataStr, patten = "YYYY-MM-DD") {
  return moment(dataStr).format(patten)
})

//阻止生产提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')