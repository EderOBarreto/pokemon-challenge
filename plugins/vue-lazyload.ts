import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const errorimage = require('~/assets/images/error.gif')
const loadimage = require('~/assets/images/spinner.gif')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 2,
})
