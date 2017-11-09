import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import vuexI18n from 'vuex-i18n'
import * as Vux from 'vux'


console.log(Vux)
Object.keys(Vux).forEach(item=>{
    if((/plugin/i).test(item)){
        try{
            Vue.use(Vux[item])
        }catch (e){
            console.log(item)

        }

    }
})
/**
 * you can add your module here
 */
let store = new Vuex.Store({
    modules: {
        i18n: vuexI18n.store
    }
})

store.registerModule('vux', {
    state: {
        demoScrollTop: 0
    },
    mutations: {
        updateDemoPosition (state, payload) {
            state.demoScrollTop = payload.top
        }
    },
    actions: {
        updateDemoPosition ({commit}, top) {
            commit({type: 'updateDemoPosition', top: top})
        }
    }
})

Vue.use(vuexI18n.plugin, store)
Vue.i18n.set('zh-CN')
