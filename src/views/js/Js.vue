<template>
    <div class="x--list">
        <h3>Js</h3>
        <p>
            <router-link :to="{ name: 'js.scroll'}">滚动 / ScrollTo</router-link>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Js'
})
</script>
