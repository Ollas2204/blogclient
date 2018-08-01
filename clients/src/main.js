import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import axios from 'axios'
import Vueditor from 'vueditor'

import 'vueditor/dist/style/vueditor.min.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000/'
})

let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: 'arial black'},
    {val: 'times new roman'},
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: ''
}

Vue.use(VModal)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Vueditor, config)
