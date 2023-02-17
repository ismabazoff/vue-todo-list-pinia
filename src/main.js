import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Modal from './components/Modal.vue'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('Modal', Modal)
app.mount('#app')
