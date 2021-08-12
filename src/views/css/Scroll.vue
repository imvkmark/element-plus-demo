<template>
    <van-nav-bar @click-left="$router.back()" title="滚动定位" left-arrow fixed safe-area-inset-top/>
    <div class="x--list x--plain" ref="plain">
        <div v-for="i in 10" :class="`scroll bg-${i}`">{{ `scroll-${i}` }}</div>
    </div>
    <van-sticky :offset-bottom="100" :container="plain" position="bottom" style="height: 0;text-align: right;">
        <van-button type="primary">吸底距离</van-button>
    </van-sticky>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'CssScroll',
    setup() {
        const plain = ref(null);
        return { plain };
    }
})
</script>

<style scoped lang="less">
.scroll {
    height: 200px;
}

/* 百分比宽度
 * ---------------------------------------- */
.loopPercentWidth(@counter) when (@counter >= 0) {
    .loopPercentWidth((@counter - 1));
    .bg-@{counter} {
        background: darken(#F3D9FA, 2% * @counter);
    }
}

.loopPercentWidth(10);
</style>