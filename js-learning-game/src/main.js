import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCircleInfo, faPlus, faPause, faPlay, faCog } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// ibrary.add(faPlus, faCog, faPause, faPlay, faCircleInfo)

const app = createApp(App)
   
app.use(store)
// app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
