<template>
  <div class="">
      <div
        v-if="connected"
        class="flex justify-center items-center"
      >
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item
                key="1"
                @click="disconnect()"
              >
                <div class="flex items-center">
                 <PoweroffOutlined class="pr-2" />
                 <span>disconnect</span>
                </div>
              </a-menu-item>

            </a-menu>
          </template>
          <a-tag
            class="text-base cursor-pointer flex items-center"
            color="green"
          >
            <span>{{publicKeyStr}}</span>
            <DownOutlined class="pl-2" />
          </a-tag>
        </a-dropdown>
      </div>
      <a-button
        v-else
        class="font-semibold"
        type="primary"
        shape="round"
        size="large"
        @click="isModalVisible = true"
      >
        Connect Wallet
      </a-button>

      <a-modal
        v-model:visible="isModalVisible"
        title="Select Your Wallet"
        :footer="null"
        :closable="false"
        :centered="true"
      >
      <div class="flex flex-col justify-center items-center px-10">
        <div
          v-for="wallet in wallets"
          class="flex justify-start items-center w-full px-4 py-2 m-2 cursor-pointer hover:bg-purple-500 rounded"
          :key="wallet.name"
          @click="onWalletSelect(wallet.name)"
        >
          <div class="wallet-icon">
            <img :src="wallet.icon" :alt="wallet.name + ' icon'">
          </div>
          <div class="ml-5 text-lg font-semibold">
            {{ wallet.name }}
          </div>
        </div>
      </div>
      </a-modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { wallets, useWalletReactive } from '@/libs/useWallet'
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons-vue'

export default {
  name: 'Wallet',
  components: {
    DownOutlined,
    PoweroffOutlined
  },
  setup () {
    const isModalVisible = ref(false)
    const { connect, select, disconnect, connected, publicKey } = useWalletReactive()

    const onWalletSelect = async (name) => {
      isModalVisible.value = false

      await select(name)

      try {
        await connect()
      } catch (err) {
        console.warn(err)
      }
    }

    const publicKeyStr = computed(() => {
      const str = publicKey.value.toBase58()

      return `${str.slice(0, 4)}...${str.slice(-4)}`
    })

    return {
      isModalVisible,
      disconnect,
      connected,
      publicKeyStr,
      wallets,
      onWalletSelect
    }
  }
}
</script>

<style lang="scss" scoped>
  $w-icon-size: 50px;

  .wallet-icon {
    width: $w-icon-size;
    height: $w-icon-size;

    img {
      width: 100%;
    }
  }
</style>
