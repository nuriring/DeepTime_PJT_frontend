<template>
  <div id="app">
    <nav-bar></nav-bar>
    
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'

  import { mapActions } from 'vuex'

  export default {
    name: 'App',
    components: { NavBar },
    methods: {
      ...mapActions(['fetchCurrentUser'])
    },
    created() {
      this.fetchCurrentUser()

      
    }
  }
</script>

<style>
  #app {
    height: 100vh;
    overflow: visible;
    /* background-image: url("./assets/background.png"); */
    background-size: cover;
    background-repeat: repeat;
    background-attachment: scroll;


  }
</style>
