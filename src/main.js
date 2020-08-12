require('./bootstrap')
require('./plugins')
import Vue from 'vue'
import BaseTemplate from './layouts/BaseTemplate'
import router from './routes'

import store from './store'

Vue.config.productionTip = false

/**
 * Global Componetns
 */
 
 Vue.component('preloader-component', () => import('./components/Preloader'))


new Vue({
  render: h => h(BaseTemplate),
  router,
  store,
}).$mount('#app')


store.dispatch('getMe') // Verifica logo ao inicio da aplicação se o utilizador esta autenticado e muda o state para logado ou não
