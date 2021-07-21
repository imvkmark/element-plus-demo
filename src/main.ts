import { createApp } from 'vue'
// vant base style
import 'vant/lib/style/base.less';
// ui @vant
import useUi from '@/components/framework/use-ui'
// route
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'


const app = createApp(App)
useUi(app).use(router).use(store, key).mount('#app')
