<template>
    <div>
      <v-bar-app v-if="isLoggedIn" class="d-flex">
        <router-link :to="{name:'main'}">

          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2 logo2"
            contain
            src="@/assets/logo2.jpg"
            transition="scale-transition"
            width="100"
          /> 
        </router-link>
                
        <!-- <img src = "@/assets/logo2.jpg" class="logo2"> -->
        <b-nav class="fs-5">
          <b-nav-item v-if="isLoggedIn">
            <router-link :to="{ name: 'articles' }" class="text-decoration-none text-white">본자들</router-link>
          </b-nav-item>
          <b-nav-item class="nav-item" v-if="isLoggedIn">
            <router-link :to="{ name: 'otts' }" class="text-decoration-none text-white">OTT 지도</router-link>
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn">
            <router-link :to="{ name: 'logout' }" class="text-decoration-none text-white">LOGOUT</router-link>
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn" >
              
            <router-link :to="{ name: 'profile', params: { username } }" class="text-decoration-none text-white">
              {{ currentUser.username }}'s Profile
            </router-link>
            <v-icon> mdi-account-circle
              </v-icon>
          </b-nav-item>
          </b-nav>
      </v-bar-app>
      </div>  
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(['isLoggedIn', 'currentUser']),
      username() {
        return this.currentUser.username ? this.currentUser.username : 'guest'
      },
    },
  }
</script>

<style scoped>
.nav {
  display: flex;
  
}
.logo2 {
  /* display: absolute; */
  height: auto;
  left: -1210px;

}
.nav-item{
  height: 10px;

}
.nav-link{
  margin-top: 0.5rem;

  
}

</style>
