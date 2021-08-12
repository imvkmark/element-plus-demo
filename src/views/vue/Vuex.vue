<template>
    <div class="vant--vuex">
        <div class="page-title">Vuex Test Page</div>
        <p>store Root is: {{ text }}</p>
        <p>store doubleCount is: {{ count }}</p>
        <van-button type="primary" @click="double">double</van-button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
    name: 'Vuex',

    setup() {
        const store = useStore()
        const reactiveData = reactive({
            text: computed(() => store.state.text),
            count: computed(() => store.state.vant.count)
        })

        const double = () => {
            store.commit('vant/DOUBLE_COUNT')
        }

        return {
            ...toRefs(reactiveData),
            double
        }
    }
})
</script>

<style scoped lang="less">
.vant--vuex {
    text-align: center;
}
</style>