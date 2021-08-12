<template>
    <div class="x--list">
        <h3>Css</h3>
        <p>
            <router-link :to="{ name: 'css.scroll'}">向下滚动</router-link>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Css'
})
</script>
