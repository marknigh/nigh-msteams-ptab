import { createApp } from 'vue'
import App from './App.vue'
import 'bulma-fluent/css/bulma.css'
import { Auth } from './assets/sso_auth'

const microsoftTeams = new Auth()
const token = microsoftTeams.get_token()
console.log('token: ', token)

createApp(App).mount('#app')
