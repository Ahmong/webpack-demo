/**
 * Created by mzh on 17-4-9.
 */

/**
 * Vue section：
 * 以下为启动 vue + router + vuex 的代码。
 */
import Vue from 'vue'
/*
import Resource from 'vue-resource'
import Electron from 'vue-electron'
import Router from 'vue-router'
import vuex from 'vuex'
*/

import VueApp from './vue/VueApp.vue'
import ScopedSelectors from "./vue/1-ScopedSelectors/ScopedSelectors.vue"

Vue.config.debug = true

/*
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})
*/

// Vue.use(Resource)

/* eslint-disable no-new */
Vue.component(ScopedSelectors.name, ScopedSelectors);

new Vue(VueApp).$mount('#vueapp')
