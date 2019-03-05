import Vue from 'vue'
import Table from '@table/index'
import '@table/style.css'
import App from './App.vue'

Vue.use(Table)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App id="app" />'
})
