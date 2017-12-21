import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langs from './langs'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  messages: langs
})
