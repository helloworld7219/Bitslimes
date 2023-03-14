<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center mb-5">
      <WaveSteps :step="2" class="w-full lg:w-2/3 xl:w-2/3" />
    </div>

    <h1>Your Wave Metadata</h1>

    <div class="flex justify-center text-left">
      <a-form
        ref="formRef"
        class="ant-input-group-lg w-full overflow-hidden lg:w-7/8 xl:w-3/4"
        layout="vertical"
        :model="formData"
        :rules="rules"
      >
        <a-form-item name="name" label="Name:" :required="true">
          <a-input
            v-model:value="formData.name"
            placeholder="Name your wave"
          />
        </a-form-item>

        <div class="m-3 text-base italic">
            <div>-- express the essence of your record</div>
            <div>-- keep it short </div>
        </div>

        <a-form-item label="Description:">
            <a-textarea
              v-model:value="formData.description"
              placeholder="Describe your wave [OPTIONAL]"
              :auto-size="{ minRows: 2, maxRows: 4 }"
            />
        </a-form-item>

        <div class="m-3 text-base italic">
            <div>-- what's the story behind this wave?</div>
            <div>-- share all the details with the world</div>
            <div>-- get creative</div>
        </div>
      </a-form>
    </div>

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
import { setTextData } from '@/libs/useSteps'

export default {
  name: 'Metadata',
  setup () {
    const rules = {
      name: [
        {
          required: true,
          message: 'Please fill out this field, no one can live without a name',
          trigger: 'blur'
        }
      ]
    }

    return {
      rules
    }
  },
  data () {
    return {
      formData: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    onNext () {
      const { formRef } = this.$refs

      formRef
        .validate()
        .then(() => {
          setTextData(this.formData)
          this.$router.push('mint')
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    onBack () {
      this.$router.push('waveform')
    }
  }
}
</script>
