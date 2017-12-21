import Vue from 'vue'
import ReflectOS from '@/App'
import router from '@/router'
import store from '@/store'
import translation from '@/translation'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { ReflectOS },
  router,
  store,
  i18n: translation,
  template: '<ReflectOS/>'
}).$mount('#app')
