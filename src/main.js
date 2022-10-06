import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as apolloProvider from '@/apollo-provider'
createApp(App).use(store).use(apolloProvider.provider).use(router).mount('#app')
