<template>
  <div id="app">
    <HomeView/>
    <!-- <homeView :dialogVisible="dialogVisible" :getFormViewFlag="setFormViewFlag"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomeView from '@p/home/index'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    HomeView
  },
  created () {
    document.title = this.$t('TITLE').joinCM
  },
  methods: {
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
