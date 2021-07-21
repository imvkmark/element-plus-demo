<template>
    <div class="axios-container page-container">
        33333
        <div class="page-title">Axios Test Page</div>
        <div class="user-info-container">
            <div class="box-card">
                <div class="card-header">
                    <span>XPoet</span>
                    <br>
                    <van-button class="button" type="text" @click="getUserInfo"
                    >点击获取XPoet信息
                    </van-button>
                </div>
                <div class="info-list-box">
                    <div class="text item" v-if="userInfo?.name">name: {{ userInfo?.name }}</div>
                    <div class="text item" v-if="userInfo?.bio">bio: {{ userInfo?.bio }}</div>
                    <div class="text item" v-if="userInfo?.blog">blog: {{ userInfo?.blog }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { apiUserProfileInfo } from '@/services/user/profile';

export default defineComponent({
    name: 'Axios',
    setup() {
        const userInfo: Ref = ref(null)
        const loading = ref(false)

        const getUserInfo = () => {
            loading.value = true
            apiUserProfileInfo()
                .then((response) => {
                    console.log('response: ', response)
                    userInfo.value = response.data
                    loading.value = false
                })
                .catch((error) => {
                    loading.value = false
                    console.error(error)
                })
        }
        console.log(userInfo);
        return {
            userInfo,
            loading,
            getUserInfo
        }
    }
})
</script>