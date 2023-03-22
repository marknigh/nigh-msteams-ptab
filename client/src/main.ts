import { createApp } from 'vue'
import App from './App.vue'
import 'bulma-fluent/css/bulma.css'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
