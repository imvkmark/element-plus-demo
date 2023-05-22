import { createFromIconfontCN } from '@ant-design/icons-vue'

/**
 * 封装 IconFont Url
 * https://2x.antdv.com/components/icon-cn/#components-icon-demo-iconfont
 */

let iconUrl = import.meta.env.VITE_ICON_URL;
const IconFont = createFromIconfontCN({
    scriptUrl: String(iconUrl ? iconUrl : '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'),
});
export default IconFont;