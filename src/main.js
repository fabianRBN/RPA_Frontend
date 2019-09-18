import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import FileUpload from 'v-file-upload'

import Vuelidate from 'vuelidate'
import DynamicSelect from 'vue-dynamic-select'
 


Vue.use(VueMaterial,axios,VueAxios,FileUpload,Vuelidate,DynamicSelect)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
