import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios';
import platform from "./utils/platform"
import VueLazyLoad from 'vue-lazyload'
import bottom_btn from "./components/bottom_btn"
import module from "./components/module"
import { Toast} from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.prototype.$toast=Toast;


import swiper2 from "./components/swiper2"
import video2 from "./components/video2"
import "./utils/loadImg"
import "./assets/css/main.css"
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);

Vue.component('bottom_btn',bottom_btn);
Vue.component('module',module);
Vue.component('swiper2',swiper2);
Vue.component('video2',video2);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad);
Vue.prototype.platform=platform;

var app=new Vue({
  router,
  store,
  data:{
    a:1
  },
  render: h => h(App)
}).$mount('#app');

