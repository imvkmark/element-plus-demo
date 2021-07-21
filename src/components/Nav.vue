<template>
    <van-tabbar :fixed="true" safe-area-inset-bottom>
        <van-tabbar-item
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
                    path: '/'
                },
                {
                    name: 'Vant',
                    isActive: false,
                    path: '/vant'
                },
                {
                    name: 'Axios',
                    isActive: false,
                    path: '/axios'
                }
            ],
            navClick(e: NavItem) {
                router.push(e.path)
            }
        })

        const changeNavActive = (currentPath: string) => {
            reactiveData.navList.forEach((v: NavItem) => {
                const temp = v
                temp.isActive = temp.path === currentPath
                return temp
            })
        }

        watch(
            () => router.currentRoute.value,
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
