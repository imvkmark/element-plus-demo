<template>
    <div class="vant--element">
        <p>
            <van-button type="primary" :onclick="showToast">Show Toast</van-button>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Toast } from 'vant';

export default defineComponent({
    name: 'Element',
    methods: {
        showToast: function () {
            Toast('Show Toast At Element')
        }
    }
})
</script>

<style scoped lang="less">
.vant--element {
    text-align: center;
}
</style>
