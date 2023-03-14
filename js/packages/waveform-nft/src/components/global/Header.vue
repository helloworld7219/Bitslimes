<template>
  <nav id="nav" class="container mx-auto">
    <div
      class="nav-row z-10 max-w-screen-lg xl:max-w-screen-xl block flex justify-between items-center my-10"
    >
      <router-link
        to="/"
        class="nav-link block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light"
      >
        HOME
      </router-link>
      <Wallet />
    </div>
  </nav>
</template>

<script>
import Wallet from '@/components/Wallet.vue'

export default {
  name: 'Header',
  components: {
    Wallet
  }
}
</script>

<style lang="scss" scoped>
 a.nav-link.router-link-exact-active {
  @apply dark:text-purple-400;
  @apply font-medium;
}

.nav-row {
  height: 30px;
}
</style>
