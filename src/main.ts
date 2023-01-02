import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// fluent UI web components
import { provideFluentDesignSystem, allComponents } from '@fluentui/web-components';
provideFluentDesignSystem().register(allComponents);

createApp(App).mount('#app')
