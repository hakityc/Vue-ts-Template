import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './routers'
import { setupStore } from './stores'
import '@unocss/reset/tailwind.css'
import './style.css'
import 'virtual:uno.css'

const app = createApp(App)

function setupPlugin() {}

function setupApp() {
  setupStore(app)
  setupRouter(app)
  app.mount('#app')
}

setupPlugin()
setupApp()
