import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button,
  Select,
  Slider,
  Switch,
  Modal,
  Tag,
  Input,
  Form,
  Menu,
  Dropdown,
  Spin,
  Card,
  Alert,
  Result,
  Steps
} from 'ant-design-vue'

import './assets/styles/tailwind.css'
import './assets/styles/app.scss'

import { initWallet } from './libs/useWallet'
import { initConnection } from './libs/useConnection'
import { setupWF } from './libs/useSteps'
import WaveSteps from './components/WaveSteps.vue'

// init important components before app created
initWallet(true)
initConnection()
setupWF()

const app = createApp(App)

app
  .use(Button)
  .use(Select)
  .use(Slider)
  .use(Switch)
  .use(Modal)
  .use(Tag)
  .use(Input)
  .use(Form)
  .use(Menu)
  .use(Dropdown)
  .use(Spin)
  .use(Card)
  .use(Alert)
  .use(Result)
  .use(Steps)
  .use(router)

app.component('WaveSteps', WaveSteps)

app.mount('#app')
