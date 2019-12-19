import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/basic.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'

Vue.prototype.axios=axios
Vue.use(ElementUI);

Vue.filter("dataFormat",function(dataStr,patten="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(patten)
})

//阻止生产提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
