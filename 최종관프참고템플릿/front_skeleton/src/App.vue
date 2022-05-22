<template>
  <div id="app">
    <nav-bar></nav-bar>
    <hr />
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
      this.fetchCurrentUser() //App.vue가 시작되자마자 해야하는건 currentuser 가져오기
    }
  }
</script>

<style></style>
