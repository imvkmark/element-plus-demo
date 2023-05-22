import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Plain from "@/layouts/Plain.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Plain,
        children: [
            { path: '/', component: () => import('@/views/home/Home.vue'), name: 'home.readme' },
            { path: 'search', component: () => import('@/views/home/Search.vue'), name: 'home.search' }
        ]
    },
    {
        path: '/data',
        component: Plain,
        children: [
            { path: 'image', component: () => import('@/views/data/Image.vue'), name: 'data.image' },
        ]
    },
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
