<template>
    <router-view/>
    <Nav/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Nav from '@/components/vant/Nav.vue'

export default defineComponent({
    name: 'Vant',
    components: { Nav }
})
</script>