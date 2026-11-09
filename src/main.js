import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'

createApp(App)
    .use(router)
    .mount('#app')