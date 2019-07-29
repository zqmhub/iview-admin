import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: resolve => require(['@/views/login.vue'], resolve),
    },
    // {
    //   path: '/viewCompanies',
    //   name: 'viewCompanies',
    //   meta: {
    //     title: '无菜单'
    //   },
    //   component: resolve => require(['@/views/noMenu/index.vue'], resolve),
    // },
    {
      path: '/',
      // redirect: {name:'login'},
      meta: {
        title: ''
      },
      component: resolve => require(['@/views/index.vue'], resolve),
      children: [{
          path: '/',
          name: '',
          meta: {
            title: '产业分布'
          },
          component: resolve => require(['@/views/chanyeTree/index.vue'], resolve),
        },
   
        {
          path: '/chanyeTree',
          name: 'chanyeTree',
          meta: {
            title: '产业分布'
          },
          component: resolve => require(['@/views/chanyeTree/index.vue'], resolve),
        },
        {
          path: '/businessManagement',
          name: 'businessManagement',
          meta: {
            title: '企业列表'
          },
          component: resolve => require(['@/views/businessManagement/index.vue'], resolve),
        },
        {
          path: '/companyDetails/:id',
          name: 'companyDetails',
          meta: {
            title: '企业详情'
          },
          component: resolve => require(['@/views/companyDetails/index.vue'], resolve),
        },
 
     

        {
          path: '/changeBusinessInfo/:id',
          name: 'changeBusinessInfo',
          meta: {
            title: '企业编辑'
          },
          component: resolve => require(['@/views/changeBusinessInfo/index.vue'], resolve)
        },
        {
          path: '/authoRization',
          name: 'authoRization',
          meta: {
            title: '权限设置'
          },
          component: resolve => require(['@/views/authoRization/index.vue'], resolve),
        },
      
     
      ]
    },
    {
      path: '*',
      name: '404',
      meta: {
        title: '404'
      },
      component: resolve => require(['@/components/404.vue'], resolve),
    },

  ]
})
