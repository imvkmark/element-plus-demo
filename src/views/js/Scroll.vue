<template>
    <x-nav-bar title="滚动定位"/>
    <div class="x--list" ref="refList" @scroll="onScroll">
        <div v-for="i in 10" :class="`scroll bg-${i}`">{{ `scroll-${i}` }}</div>
        <div class="list-tag">x--list</div>
    </div>
    <div class="x--desc">
        <h3>基于 x--list 的页面滚动</h3>
        <p>
            当前每个元素高度 200, x--list 是页面容器 <br>
            Offset-Y:{{ trans.top }} Height : {{ trans.height }} <br>
            这里的平滑滚动用到了
            <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior" target="_blank">
                <code>Css 属性 (scroll-behavior)</code>
            </a>
        </p>
        <p>
            <van-button plain size="small" hairline @click="refList.scrollTop=0" style="margin-right: 0.5rem;">滚动到顶部</van-button>
            <van-button plain size="small" hairline @click="onScrollTo">滚动到 5 (偏移量是 4个单位)</van-button>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import XNavBar from '@/components/core/XNavBar.vue';

export default defineComponent({
    name: 'JsScroll',
    components: { XNavBar },
    setup() {
        const refList: any = ref(null);
        const trans = reactive({
            refList: null,
            top: 0,
            height: 0
        })
        const onScroll = function (e) {
            trans.top = e.target.scrollTop;
            trans.height = e.target.scrollHeight;
        }
        const onScrollTo = function () {
            refList.value.scrollTop = 200 * 4;
        }

        const initValue = function () {
            trans.height = refList.value.scrollHeight;
        }
        onMounted(initValue);
        return {
            refList, trans,
            onScroll, onScrollTo
        };
    }
})
</script>

<style scoped lang="less">
.scroll {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 百分比颜色
 * ---------------------------------------- */
.loopPercentWidth(@counter) when (@counter >= 0) {
    .loopPercentWidth((@counter - 1));
    .bg-@{counter} {
        background: darken(#F3D9FA, 2% * @counter);
    }
}

.loopPercentWidth(10);
</style>