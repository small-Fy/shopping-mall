import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api";
import FastClick from "fastclick";
import Vant from "vant";
import "vant/lib/index.css";
import { Toast } from 'vant';
import dayjs from "dayjs";
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll);
Vue.use(Toast);
Vue.use(Vant);
Vue.prototype.$api = api;
Vue.prototype.$dayjs = dayjs;
Vue.config.productionTip = false;
FastClick.attach(document.body);

// 响应拦截
// axios.defaults.timeout = 10000; // 设置超时时间
// // 过滤请求结果 只返回结果的data
// axios.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
