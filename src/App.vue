<template>
  <div id="app">
    <router-view></router-view>
    <!-- <playerBar></playerBar> -->
  </div>
</template>

<script>
import playerBar from '../src/components/playerBar.vue'
export default {
  name: 'app',
  components:{
  	playerBar
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
  /*padding-bottom: 60px;*/
  max-width: 720px;
}
</style>
