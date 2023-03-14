
import { ref } from 'vue'
import WFPlayer from 'wfplayerAdjusted'

const storage = {
  record: ref(null),

  waveImgUrl: ref(''),

  waveFile: null,

  wf: null,

  textData: ref(null)
}

export const useSteps = () => storage

export async function setRecord (file) {
  if (!file) {
    storage.record.value = null
    return
  }

  const src = window.URL.createObjectURL(file)
  const arrayBuffer = await file.arrayBuffer()

  const audioContext = new AudioContext()

  const audio = await audioContext.decodeAudioData(arrayBuffer.slice(0))

  audioContext.close()

  const duration = Math.min(10.00, audio.duration)

  storage.record.value = {
    src,
    arrayBuffer,
    duration
  }
}

export function setupWF () {
  if (storage.wf) {
    storage.wf.destroy()

    storage.wf = null
  }

  storage.wf = new WFPlayer({
    container: null,
    useWorker: false,
    width: 1500,
    height: 500,
    shadowCanvas: true,
    scrollable: false,
    ruler: false,
    cursor: false,
    progress: false,
    grid: false,
    padding: 0,
    backgroundColor: '#000014',
    waveColor: {
      startColor: '#793aab',
      endColor: '#7ac4bf'
    },
    waveScale: 1,
    duration: 10
  })

  storage.wf.on('finish', () => {
    storage.waveImgUrl.value = storage.wf.exportImageAsUrl()
  })
}

export function loadWave () {
  if (!storage.record.value) return

  storage.waveFile = null

  storage.wf.lazySetOptions({
    duration: Math.min(10, Math.round(storage.record.value.duration) || 1)
  })
  storage.wf.load(storage.record.value.src)
}

export function setWfOptions (options) {
  if (!storage.record.value) return

  storage.wf.setOptions(options)
}

export async function saveWaveFile () {
  const blob = await storage.wf.exportImageAsBlob()

  storage.waveFile = new File([blob], 'waveform.jpg')
}

export function setTextData ({ name, description }) {
  storage.textData.value = {
    name,
    description
  }
}
