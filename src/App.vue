<template>
    <van-config-provider :theme-vars="theme">
        <router-view/>
    </van-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    setup() {
        return {
            theme: {
                // buttonPrimaryBorderColor: '#07c160',
            }
        }
    }
})
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
