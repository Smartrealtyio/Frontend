<template>
  <div id="app">
    <Header />
    <main-page></main-page>
    <Footer />
  </div>
</template>

<script>

import Header from './components/partials/header'
import Footer from './components/partials/footer'
import mainPage from './components/pages/main/main'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    mainPage
  }
}
</script>

<style lang="scss">
@import 'assets/styles/style'
</style>