<template>
  <a-steps :current="step">
    <a-step title="Voice it"/>
    <a-step title="Customize" />
    <a-step title="Give it a name" />
    <a-step title="Mint!" />
  </a-steps>
</template>

<script>
export default {
  name: 'WaveSteps',
  props: {
    step: Number
  }
}
</script>
