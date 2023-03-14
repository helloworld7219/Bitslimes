<template>
  <div class="text-3xl text-center dark:text-primary-light">
    {{ timerCount }} seconds left
  </div>
</template>

<script>

export default {
  name: 'CountDown',
  props: {
    seconds: Number
  },

  data () {
    return {
      timerCount: 0
    }
  },

  methods: {
    _timer () {
      if (this.timerCount >= 0) {
        setTimeout(() => {
          this.timerCount--
          this._timer()
        }, 1000)
      } else {
        this.$emit('finish')
      }
    },

    play () {
      this.timerEnabled = true
      this.timerCount = this.seconds

      this._timer()
    },

    stop () {
      this.timerEnabled = false
      this.timerCount = 0
    }

  }

}

</script>
