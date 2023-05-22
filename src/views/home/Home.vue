<template>
    <ElRow>
        <ElCol :span="24">
            <div class="home-container">
                <p>
                    <img class="logo" alt="Vue logo" src="@/assets/logo.png"/>
                </p>
                <p>
                    Vite4.x + Vue3.x + TypeScript + Element Plus 2.x
                </p>
                <p>
                    IconFont
                    <icon-font type="icon-tuichu"/>
                </p>
            </div>
        </ElCol>
    </ElRow>
    <ElRow>
        <ElCol :span="4" :sm="6">
            <router-link :to="{name: 'data.image'}">Image 加载图片</router-link>
        </ElCol>
    </ElRow>
</template>

<script setup lang="ts">
import IconFont from '@/components/core/IconFont';</script>

<style scoped lang="less">

.home-container {
    margin: 0 auto;
    text-align: center;
    .logo {
        width: 20%;
    }
}
</style>
