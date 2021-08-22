import { App } from 'vue'
import { Button, NavBar, Popup, Sticky, Tabbar, TabbarItem, Toast, Icon } from 'vant';

export default function useUi(app: App) {
    app.use(Button)
        .use(Tabbar)
        .use(TabbarItem)
        .use(Toast)
        .use(NavBar)
        .use(Popup)
        .use(Icon)
        .use(Sticky)
    return app
}
