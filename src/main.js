// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import App from './App'
import router from './router'
import 'babel-polyfill'

//组件
import routeBar from '../src/components/route-bar.vue'
import layoutMenu from '../src/components/menu.vue'
import cIcon from '../src/components/collapse.vue'
import mTable from '../src/components/mtable.vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/style.css'
import './assets/css/global.css'
import axios from './assets/js/axiosInterCeptor'
import Request from './assets/js/request'
// import Vue2OrgTree from 'vue2-org-tree';
// Vue.use(Vue2OrgTree)
Vue.use(iView)
Vue.component('route-bar', routeBar)
Vue.component('shrinkable-menu', layoutMenu)
Vue.component('collapse-icon', cIcon)
// Vue.component('m-table', mTable)

Vue.prototype.$request = Request
Vue.prototype.$Vue = Vue
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
