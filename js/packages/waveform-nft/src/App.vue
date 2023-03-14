<template>
  <div class="dark" id="layout-container">
    <Header/>

    <div class="dark:text-primary-light text-lg font-medium" id="content-wrap">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <Footer id="footer" />
  </div>
</template>

<script>
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
$f-height: 80px;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#layout-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: $f-height * 2;
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: $f-height;
}
</style>
