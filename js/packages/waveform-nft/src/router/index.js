import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Input from '@/views/Input.vue'
import Waveform from '@/views/Waveform.vue'
import Metadata from '@/views/Metadata.vue'
import Mint from '@/views/Mint.vue'
import Thanks from '@/views/Thanks.vue'
import { useSteps } from '@/libs/useSteps'

const stepsStorage = useSteps()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/input',
    name: 'Input',
    component: Input
  },
  {
    path: '/waveform',
    name: 'Waveform',
    component: Waveform,
    beforeEnter: (to, from, next) => {
      if (stepsStorage.record.value) {
        next()
      } else {
        next({ name: 'Input' })
      }
    }
  },
  {
    path: '/metadata',
    name: 'Metadata',
    component: Metadata,
    beforeEnter: (to, from, next) => {
      if (stepsStorage.waveFile) {
        next()
      } else {
        next({ name: 'Waveform' })
      }
    }
  },
  {
    path: '/mint',
    name: 'Mint',
    component: Mint,
    beforeEnter: (to, from, next) => {
      if (stepsStorage.waveFile && stepsStorage.textData) {
        next()
      } else {
        next({ name: 'Metadata' })
      }
    }
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
