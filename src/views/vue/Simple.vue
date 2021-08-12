<template>
    <div class="x--demo text-center">
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