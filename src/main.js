import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
import'element-ui/lib/theme-chalk/index.css'
import'@wangeditor/editor/dist/css/style.css'
import{get,post} from './utils/api'

import Cookie from 'js-cookie'
import './utils/filter.js'

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$cookie=Cookie

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  el:'#app',
  render: h => h(App),
  router,
  beforeCreate(){
		Vue.prototype.$bus = this	//安装全局事件总线
	}

})
