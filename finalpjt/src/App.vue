<template>
  <v-app>
    <v-app-bar v-if="isLoggedIn" class="vbar" 
      app
      dark
    >
      <div class="d-flex align-center">



      </div>

      <v-spacer></v-spacer>

          <nav-bar></nav-bar>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script> 

import { mapActions,mapGetters } from 'vuex'
import NavBar from '@/components/NavBar.vue'

 
export default {
  name: 'App',
  components: { NavBar },
  data: () => ({
    isLoading: true
  }),
  methods: {
      ...mapActions(['fetchCurrentUser']),

    },
  computed:{
    ...mapGetters(['isLoggedIn']),
  },
  created() {
    
    this.fetchCurrentUser()

  }
};
</script>

<style>
  .vbar {
    background : linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), #6C7B8B;

  }
  

</style>

