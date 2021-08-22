<template>
    <div class="x--navbar">
        <van-icon name="arrow-left" @click="$router.back()"/>
        <strong>{{ title }}</strong>
        <span>&nbsp;</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'XNavBar',
    props: {
        title: String
    }
})
</script>
<style scoped lang="less">

</style>