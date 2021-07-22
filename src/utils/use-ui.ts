import { App } from 'vue'
import { Button, ConfigProvider, NavBar, Popup, Sticky, Tabbar, TabbarItem, Toast } from 'vant';

export default function useUi(app: App) {
    app.use(Button)
        .use(Tabbar)
        .use(TabbarItem)
        .use(ConfigProvider)
        .use(Toast)
        .use(NavBar)
        .use(Popup)
        .use(Sticky)
    return app
}
