import VantTypes from './modules/vant/types'

export default interface RootStateTypes {
    text: string
}

export interface AllStateTypes extends RootStateTypes {
    vant: VantTypes
}
