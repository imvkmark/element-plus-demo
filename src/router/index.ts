import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Home from '@/views/vant/Home.vue'
import Vuex from '@/views/vant/Vuex.vue'
import Request from '@/views/vant/Request.vue'
import Vant from '@/layouts/Vant.vue';
import Parent from '@/views/vant/Parent.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/vant',
        component: Vant,
        children: [
            { path: 'home', component: Home },
            { path: 'vuex', component: Vuex },
            { path: 'request', component: Request },
            { path: 'parent', component: Parent },
            // 懒加载
            { path: 'element', component: () => import('@/views/vant/Element.vue') }
        ]
    }
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
