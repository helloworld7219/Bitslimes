<template>
  <div class="container mx-auto">

    <div class="flex justify-center items-center mb-5">
      <WaveSteps :step="0" class="w-full lg:w-2/3 xl:w-2/3" />
    </div>

    <h1>Record your voice or upload an existing record</h1>

    <div class="mode-selector m-14">
      <a-select size="large" v-model:value="mode">
          <a-select-option value="record">Record now</a-select-option>
          <a-select-option value="upload">Upload an existing one</a-select-option>
      </a-select>
    </div>

    <div v-show="mode !== 'none'">
      <div class="flex justify-center items-center text-xl">
        <div>
          <span>Your record: </span>
        </div>
      </div>

      <div class="flex justify-center items-center text-xl mt-2">
        <audio class="audio-container" controls  v-if="record && record.src" >
          <source :src="record.src" type="audio/webm">
        </audio>

        <div class="flex justify-center items-center audio-container italic" v-else>
          <span>EMPTY</span>
        </div>
      </div>
    </div>

    <div class="mode-container mt-10" v-show="mode === 'record'">

      <div class="mb-2 text-base italic">
        <div>-- maximum duration is 10 seconds</div>
        <div>-- click once to start recording</div>
        <div>-- click a second time to end recording</div>
      </div>
      <VueRecordAudio
        mime-type="audio/webm"
        ref="recorder"
        class="m-5"
        mode="press"
        @start="onRecordStart"
        @result="onRecordResult"
      />

      <CountDown
      :style="{visibility: isRecording ? 'visible' : 'hidden'}"
      :seconds="10"
      ref="countDown"
      @finish="onTimeLimitFinish"
      />
    </div>

    <div class="mode-container mt-10" v-show="mode === 'upload'">
      <div class="m-2 text-base italic">
        <div>-- if your record is longer than 10 seconds, it will be cropped</div>
      </div>
      <VueUploadComponent
          :multiple="false"
          :drop="true"
          :drop-directory="false"
          accept="audio/*"
          @input-file="onFileUpload"
          ref="upload"
      >
        <div class="dropbox flex items-center justify-center">
          <p class="p-10">
            Drag your file here to begin<br> or click to browse
          </p>
        </div>
      </VueUploadComponent>
     </div>

    <div :style="{visibility: record && record.src ? 'visible' : 'hidden'}" class="flex justify-center">
      <a-button
        class="mb-10 next-step" type="primary"
        size="large"
        @click="onNext"
      >
        Next step
      </a-button>
    </div>

    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active"></div>
  </div>
</template>

<script>
import { VueRecordAudio } from '@/components/recorder'
import CountDown from '@/components/CountDown'
import { useSteps, setRecord, loadWave } from '@/libs/useSteps'
import VueUploadComponent from 'vue-upload-component'

export default {
  name: 'Input',
  components: {
    VueRecordAudio,
    CountDown,
    VueUploadComponent
  },
  setup () {
    const { record } = useSteps()

    return {
      record
    }
  },
  data () {
    return {
      mode: 'record',
      isRecording: false
    }
  },
  computed: {
  },
  methods: {
    onRecordStart () {
      this.$refs.countDown.play()
      this.isRecording = true
      setRecord(null)
    },
    async onRecordResult (blob) {
      this.isRecording = false
      this.$refs.countDown.stop()

      await setRecord(new File([blob], 'record.webm'))
    },

    onTimeLimitFinish () {
      this.$refs.recorder.stop()
    },
    async onFileUpload (fileResponse) {
      if (fileResponse) {
        await setRecord(null)
        await setRecord(fileResponse.file)
      }
    },
    onNext () {
      loadWave()

      this.$router.push('waveform')
    }
  }
}
</script>

<style lang="scss" scoped>
  .mode-container {
    height: 285px;
  }

  .mode-selector {
    .ant-select {
      width: 250px;
    }
  }

  .audio-container {
    width: 300px;
    height: 40px;

    @apply mx-5;
  }

  .dropbox {
    outline: 2px dashed white; /* the dash box */
    outline-offset: -10px;
    padding: 10px 10px;
    height: 200px;
    position: relative;
    cursor: pointer;
  }

  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .2;
    background: white;
  }

</style>
