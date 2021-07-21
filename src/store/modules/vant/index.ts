import { Module } from 'vuex'
import VantTypes from './types'
import RootStateTypes from '../../types'

// Create a new store Modules.
const vant: Module<VantTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        name: 'vant',
        count: 1
    },
    mutations: {
        DOUBLE_COUNT(state: VantTypes) {
            state.count *= 2
        }
    },
    actions: {}
}

export default vant
