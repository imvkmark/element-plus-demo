import {App} from 'vue'
import {Button, Tabbar, TabbarItem, ConfigProvider, Toast, Sticky} from "vant";

export default function useUi(app: App) {
    app.use(Button)
        .use(Tabbar)
        .use(TabbarItem)
        .use(ConfigProvider)
        .use(Toast)
        .use(Sticky)
    return app
}
