<template>
  <div class="container mx-auto">
        <div class="flex justify-center items-center mb-5">
          <WaveSteps :step="3" class="w-full lg:w-2/3 xl:w-2/3" />
        </div>

        <h1>Mint Your Wave</h1>
        <div class="flex flex-col justify-start items-center my-15">
          <a-card
            v-if="textData && waveImgUrl && record"
            class="w-full lg:w-1/2 xl:w-1/2 text-left mb-14"
          >
            <template #cover>
              <img alt="your wave" :src="waveImgUrl" />
            </template>
            <a-card-meta :title="textData.name">
              <template #description>
                <div>{{textData.description}}</div>
                <div class="mt-2">duration: {{record.duration.toFixed(2)}} sec</div>
              </template>
            </a-card-meta>
          </a-card>

          <div>Estimated minting fee:  ~ 0.012 SOL</div>

          <div class="flex flex-col mt-14 font-semibold w-full lg:w-1/2 xl:w-1/2">
            <a-alert
              v-show="!connected"
              message="Please, connect your wallet to start minting"
              type="warning"
              show-icon
            />
            <a-button
              class="mt-5"
              size="large"
              type="primary"
              :disabled="!connected"
              @click="mint()"
            >
              MINT
            </a-button>
            <a-button
              class="mt-5"
              size="large"
              @click="onBack"
            >
              BACK TO EDITING
            </a-button>
          </div>
        </div>

      <div v-show="isMintingNow" class="minting-active-drop"></div>
      <div v-show="isMintingNow" class="minting-active flex flex-col justify-center items-center">

        <a-spin size="large"/>
        <div class="mt-5">Minting In Progress...</div>
        <div class="mt-1">Please, wait (up to 2 minutes)</div>
        <div class="mt-5">You will need to click 'Approve' twice</div>
      </div>

  </div>
</template>

<script>
import { useSteps } from '@/libs/useSteps'
import { useWalletReactive } from '@/libs/useWallet'
import router from '@/router'
import { ref } from 'vue'
import { mintWaveNFT } from '@/libs/minting'
import { message } from 'ant-design-vue'

export default {
  name: 'Mint',

  setup () {
    const { waveImgUrl, textData, record } = useSteps()
    const { connected } = useWalletReactive()
    const isMintingNow = ref(false)

    const mint = () => {
      isMintingNow.value = true

      mintWaveNFT()
        .then(() => {
          router.push('thanks')
        })
        .catch(err => {
          message.error(err.message + ' Please, try again')
        })
        .finally(() => {
          isMintingNow.value = false
        })
    }

    return {
      isMintingNow,
      connected,
      waveImgUrl,
      textData,
      record,
      mint
    }
  },
  methods: {
    onBack () {
      this.$router.push('metadata')
    }
  }
}
</script>

<style lang="scss" scoped>
  .minting-active-drop {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9998;
    opacity: .7;
    background-color: black;
  }

  .minting-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
  }

</style>
