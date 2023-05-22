<template>
    <VanTabbar :fixed="true" safe-area-inset-bottom v-model="active">
        <van-tabbar-item
            :name="nav.name"
            v-for="(nav, index) in navList"
            :key="index"
            :class="{ active: nav.isActive }"
            @click="navClick(nav)"
        >
            {{ nav.title }}
        </van-tabbar-item>
    </VanTabbar>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NavItem } from '@/components/vant/types'
import Vant from "@/layouts/Vant.vue";

export default defineComponent({
    name: 'Nav',
    components: { Vant },

    setup() {
        const router = useRouter()

        const reactiveData = reactive({
            navList: [
                {
                    title: 'Readme',
                    name: 'home.readme',
                    isActive: false
                },
                {
                    title: 'Css',
                    name: 'css.home',
                    isActive: false
                },
                {
                    title: 'Javascript',
                    name: 'js.home',
                    isActive: false
                },
                {
                    title: 'Vue',
                    name: 'vue.home',
                    isActive: false
                },
                {
                    title: 'Misc',
                    name: 'misc.home',
                    isActive: false
                },
                {
                    title: 'Vant',
                    name: 'vant.home',
                    isActive: false
                }
            ],
            navClick(e: NavItem) {
                router.push({
                    name: e.name
                })
            },
            active: 'home.readme'
        })

        const changeNavActive = (name: any) => {
            reactiveData.navList.forEach((v: NavItem) => {
                if (v.name === name) {
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
                changeNavActive(router.currentRoute.value.name)
            })
        })

        return {
            ...toRefs(reactiveData)
        }
    }
})
</script>
