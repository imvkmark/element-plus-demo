<template>
    <van-tabbar :fixed="true" safe-area-inset-bottom v-model="active">
        <van-tabbar-item
            :name="nav.name"
            v-for="(nav, index) in navList"
            :key="index"
            :class="{ active: nav.isActive }"
            @click="navClick(nav)"
        >
            {{ nav.name }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NavItem } from '@/components/types'

export default defineComponent({
    name: 'Nav',

    setup() {
        const router = useRouter()

        const reactiveData = reactive({
            navList: [
                {
                    name: 'Home',
                    isActive: false,
                    path: '/vant/home'
                },
                {
                    name: 'Request',
                    isActive: false,
                    path: '/vant/request'
                },
                {
                    name: 'Vuex',
                    isActive: false,
                    path: '/vant/vuex'
                },
                {
                    name: 'Element',
                    isActive: false,
                    path: '/vant/element'
                }
            ],
            navClick(e: NavItem) {
                router.push(e.path)
            },
            active: 'Home'
        })

        const changeNavActive = (currentPath: string) => {
            reactiveData.navList.forEach((v: NavItem) => {
                if (v.path === currentPath) {
                    reactiveData.active = v.name
                }
            })
        }

        watch(
            () => {
                return router.currentRoute.value
            },
            (_n) => {
                changeNavActive(_n.path)
            }
        )

        onMounted(() => {
            router.isReady().then(() => {
                changeNavActive(router.currentRoute.value.path)
            })
        })

        return {
            ...toRefs(reactiveData)
        }
    }
})
</script>
