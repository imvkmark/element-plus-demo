<template>
    <ElImage :src="`${imageUrl}?${process}`">
        <template #error>
            <img :src="imageUrl"/>
        </template>
    </ElImage>
</template>
<script setup lang="ts">
const imageUrl = 'https://test-oss.iliexiang.com/static/image-test/5MB-1080x37183.jpg';
const process = 'x-oss-process=image/resize,l_1080'
</script>
