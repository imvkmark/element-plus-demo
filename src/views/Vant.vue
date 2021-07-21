<template>
    <div class="home-container page-container">
        <img class="vue-element-plus-logo" alt="Vue logo" src="../assets/logo.png"/>
        <div class="page-title">
            Vite2.x + Vue3.x + TypeScript + Element Plus
            <van-button type="primary" :onclick="showToast">Toast</van-button>
            <icon-font type="icon-measure"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconFont from '@/components/IconFont';
import { Toast } from 'vant';

export default defineComponent({
    name: 'Vant',
    components: { IconFont },
    methods: {
        showToast: function () {
            // Toast.success({
            //     message: 'Toast',
            //     position: 'bottom'
            // })
            Toast('xxxxx')
        }
    }
})
</script>

<style scoped lang="less">
.home-container {

    .vue-element-plus-logo {
        width: 50%
    }

}
</style>
