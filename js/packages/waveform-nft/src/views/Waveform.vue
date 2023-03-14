<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center mb-5">
      <WaveSteps :step="1" class="w-full lg:w-2/3 xl:w-2/3" />
    </div>

    <h1>Customize your Wave</h1>

    <div class="wave-img-container" v-if="waveImgUrl">
      <img :src="waveImgUrl">
    </div>

    <div class="flex flex-wrap overflow-hidden justify-start items-center my-5">
      <div class="mr-5">
        <div>Wave Scale :</div>
      </div>
      <div class="w-full overflow-hidden lg:w-1/2 xl:w-1/2">
          <a-slider
            class="mx-5"
            v-model:value="waveScale"
            :min="0.1" :max="2"
            :step="0.1"
            @change="onOptionsChange"
          />
      </div>
    </div>

    <div
      v-for="colorConf in colors"
      :key="colorConf.key"
      class="flex flex-wrap overflow-hidden justify-start items-center my-5"
    >
      <div class="mr-5">
        {{ colorConf.label }}:
      </div>
      <div class="flex justify-start items-center w-full overflow-hidden lg:w-1/2 xl:w-1/2">
        <a-switch
          un-checked-children="gradient off"
          checked-children="gradient on"
          v-model:checked="colorConf.gradient"
          @change="onOptionsChange"
        />

        <div class="ml-5">
          <a-tag :color="colorConf.startColor">{{ colorConf.startColor }}</a-tag>
          <span class="mr-1" v-show="colorConf.gradient">-</span>
          <a-tag :color="colorConf.endColor" v-show="colorConf.gradient">{{ colorConf.endColor }}</a-tag>
        </div>

        <a-button class="ml-5" type="dashed" @click="openColorModal(colorConf.key)">Change</a-button>
      </div>
    </div>

    <div class="flex justify-start">
      <a-button danger @click="onReset">RESET</a-button>
    </div>

    <a-modal
      v-model:visible="isColorModalVisible"
      title="Change color"
      @ok="handleOk"
      ok-text="Apply"
    >
    <div class="flex justify-center items-center">
      <div class="mx-8">
        <div class="ml-3 mb-1" v-show="nowEditingColor.gradient">Start color:</div>
        <ColorPicker
          ref="startColor"
          theme="dark"
          :colors-default="colorsDefault"
          :color="bufferColor.startColor"
          :sucker-hide="true"
          @changeColor="onColorPick($event, 'startColor')"
        />
      </div>

      <div class="mx-8" v-show="nowEditingColor.gradient">
        <div class="ml-3 mb-1">End color:</div>
        <ColorPicker
          ref="endColor"
          theme="dark"
          :colors-default="colorsDefault"
          :color="bufferColor.endColor"
          :sucker-hide="true"
          @changeColor="onColorPick($event, 'endColor')"
        />
      </div>
    </div>
    </a-modal>

    <div class="flex justify-center m-10">
      <a-button
        size="large"
        class="back-step mr-5"
        @click="onBack"
      >
        BACK
      </a-button>

      <a-button
        class="next-step"
        type="primary"
        size="large"
        @click="onNext"
      >
        Next step
      </a-button>
    </div>
  </div>
</template>

<script>
import { useSteps, setWfOptions, saveWaveFile } from '@/libs/useSteps'

import { ColorPicker } from 'vue-color-kit'

const DEFAULTS = {
  waveScale: 1,

  backgroundColor: '#000014',
  waveColor: {
    startColor: '#793aab',
    endColor: '#7ac4bf'
  }
}

export default {
  name: 'Waveform',
  components: {
    ColorPicker
  },
  setup () {
    const { waveImgUrl } = useSteps()
    const colorsDefault = [
      '#000000', '#FFFFFF',
      '#FF1900', '#F47365',
      '#FFB243', '#FFE623',
      '#1BC7B1', '#8E00A7',
      '#00BEFF', '#2E81FF',
      '#5D61FF', '#FF89CF',
      '#FC3CAD', '#BF3DCE'
    ]

    return {
      waveImgUrl,
      colorsDefault
    }
  },

  data () {
    return {
      isColorModalVisible: false,
      nowEditingColorKey: 'backgroundColor',
      bufferColor: {
        startColor: '#000014',
        endColor: '#000014'
      },

      waveScale: DEFAULTS.waveScale,

      colors: [
        {
          gradient: false,
          label: 'Background color',
          key: 'backgroundColor',
          startColor: DEFAULTS.backgroundColor,
          endColor: DEFAULTS.backgroundColor
        },
        {
          gradient: true,
          label: 'Wave color',
          key: 'waveColor',
          startColor: DEFAULTS.waveColor.startColor,
          endColor: DEFAULTS.waveColor.endColor
        }
      ]
    }
  },

  computed: {
    options () {
      const colors = {}

      for (const colorConf of this.colors) {
        if (colorConf.gradient) {
          colors[colorConf.key] = {
            startColor: colorConf.startColor,
            endColor: colorConf.endColor
          }
        } else {
          colors[colorConf.key] = colorConf.startColor
        }
      }

      return {
        waveScale: this.waveScale,
        ...colors
      }
    },
    nowEditingColor () {
      return this.colors.find(c => c.key === this.nowEditingColorKey)
    }
  },

  methods: {
    onOptionsChange () {
      setWfOptions(this.options)
    },
    handleOk () {
      this.isColorModalVisible = false

      const colorConf = this.colors.find(c => c.key === this.nowEditingColorKey)

      if (colorConf) {
        colorConf.startColor = this.bufferColor.startColor
        colorConf.endColor = this.bufferColor.endColor
      }

      this.onOptionsChange()
    },
    openColorModal (nowEditingColorKey) {
      this.isColorModalVisible = true
      this.nowEditingColorKey = nowEditingColorKey

      this.bufferColor.startColor = this.nowEditingColor.startColor
      this.bufferColor.endColor = this.nowEditingColor.endColor

      if (this.$refs.startColor && this.$refs.endColor) {
        this.$refs.startColor.selectColor(this.bufferColor.startColor)
        this.$refs.endColor.selectColor(this.bufferColor.endColor)
      }
    },

    onColorPick ({ hex }, key) {
      this.bufferColor[key] = hex
    },

    onReset () {
      this.waveScale = 1

      const [backgroundColor, waveColor] = this.colors

      backgroundColor.gradient = false
      backgroundColor.startColor = DEFAULTS.backgroundColor
      backgroundColor.endColor = DEFAULTS.backgroundColor

      waveColor.gradient = true
      waveColor.startColor = DEFAULTS.waveColor.startColor
      waveColor.endColor = DEFAULTS.waveColor.endColor

      this.onOptionsChange()
    },

    onBack () {
      this.$router.push('input')
    },
    onNext () {
      saveWaveFile()
        .then(() => {
          this.$router.push('metadata')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wave-img-container {
    outline: 2px solid white;
    padding: 5px;
  }
</style>
