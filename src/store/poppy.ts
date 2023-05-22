import { defineStore } from "pinia";

export const usePoppyStore = defineStore('poppy', {
    state: () => ({ loading: false }),
    getters: {
        isLoading: (state) => state.loading,
    },
    actions: {
        Loading() {
            this.loading = true
        },
        Loaded() {
            this.loading = false
        },
        Logout() {
            // logout
        },
    },
})