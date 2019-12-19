import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Index from '@/views/backstage/index.vue'
//系统
import system from '@/views/system/systeminfo.vue'
//用户
import usermanage from '@/views/user/usermanage.vue'
import useradd from '@/views/user/useradd.vue'
import editpassword from '@/views/user/editpassword.vue'
import personal from '@/views/user/personal.vue'
//商品
import goodsadd from '@/views/goods/goodsadd.vue'
import goodsmanage from '@/views/goods/goodsmanage.vue'
//销售
import salescharts from '@/views/sales/salescharts.vue'
import stockcharts from '@/views/sales/stockcharts.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Index,
    children: [{
        //系统主页
        name: 'index',
        path: '',
        component: system,
      },
      {
        //用户添加
        name: 'useradd',
        path: '/useradd',
        component: useradd,
      },
      {
        //用户管理
        name: 'usermanage',
        path: '/usermanage',
        component: usermanage,
      },
      { //修改密码
        name: 'editpassword',
        path: '/editpassword',
        component: editpassword,
      },
      { //商品添加
        name: 'goodsadd',
        path: '/goodsadd',
        component: goodsadd,
      },
      { //商品管理
        name: 'goodsmanage',
        path: '/goodsmanage',
        component: goodsmanage,
      },
      { //销售统计
        name: 'salescharts',
        path: '/salescharts',
        component: salescharts,
      },
      { //进货统计
        name: 'stockcharts',
        path: '/stockcharts',
        component: stockcharts,
      },
      { //个人信息
        name: 'personal',
        path: '/personal',
        component: personal
      },

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router