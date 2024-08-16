import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import registerGlobalComponents from './components/registerComponent'

const app = createApp(App)

// 注册自定义组件
registerGlobalComponents(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
