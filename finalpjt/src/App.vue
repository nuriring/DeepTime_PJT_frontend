<template>
  <v-app>
    <v-app-bar v-if="isLoggedIn" 
      app
      color="secondary"
      dark
    >
      <div class="d-flex align-center">

           
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->

      </div>

      <v-spacer></v-spacer>
      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >

        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
          <span class="mr-2"><nav-bar></nav-bar></span>
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
    //
  }),
  methods: {
      ...mapActions(['fetchCurrentUser'])
    },
  computed:{
    ...mapGetters(['isLoggedIn']),
  },
  created() {
    
    this.fetchCurrentUser()
  }
};
</script>
<style scoped>
  .nav {
    display: flex;

  }
</style>