import Vue from 'vue'
import App from './App.vue'
import './style.css'
import daumPostCode from './libs/daum-post-code'
Vue.config.productionTip = false

// plugin
Vue.use(daumPostCode)

new Vue({
    render: h => h(App)
}).$mount('#app')
