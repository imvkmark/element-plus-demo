<template>
    <div class="home-container">
        <p>
            <img class="logo" alt="Vue logo" src="@/assets/vant.png"/>
        </p>
        <p>
            Vite2.x + Vue3.x + TypeScript + Vant3
        </p>
        <p>
            IconFont @ Vue <br>
            <icon-font type="icon-measure"/>
        </p>
        <p>count is: {{ count }}</p>
        <button @click="increment">increment</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconFont from '@/components/core/IconFont';

export default defineComponent({
    name: 'Home',
    components: {
        IconFont
    },
    setup() {
        const count = ref<number>(0)
        const increment = () => {
            count.value += 1
        }
        return { count, increment }
    }
})
</script>

<style scoped lang="less">
.home-container {
    text-align: center;
    padding-top: 20px;
    .logo {
        width: 20%;
    }
}
</style>
