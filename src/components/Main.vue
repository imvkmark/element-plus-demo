<template>
    <router-view/>
    <Nav/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'

export default defineComponent({
    name: 'Main',
    components: {
        Header,
        Nav
    }
})
</script>
