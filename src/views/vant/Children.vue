<template>
    <van-popup
        v-model:show="show"
        @close="closeArrowLeft"
        round closeable
        position="bottom"
        close-icon-position="top-left">
        <h3>流程</h3>
    </van-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import arrowLeft from '@/assets/components/arrow-left.png';

export default defineComponent({
    name: 'Children',
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data: function () {
        return {
            arrowLeft
        }
    },
    methods: {
        closeArrowLeft: function () {
            console.log('sub-click-left-arrow');
            this.$emit('clickCloseIcon', false);
        }
    }
})
</script>
<style scoped>
h3 {
    text-align: center;
}
</style>
