import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptor from './interceptor'
// import cube-ui from 'cube-ui'
// Vue.use(cube-ui)

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//执行拦截器初始化
interceptor(app);