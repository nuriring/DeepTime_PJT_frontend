<template>
  <nav v-if="isLoggedIn" class="nav">
    <b-nav>
      <b-nav-item v-if="isLoggedIn">
        <router-link :to="{ name: 'articles' }" class="text-decoration-none text-white">본자들</router-link>
      </b-nav-item>
      <b-nav-item v-if="isLoggedIn">
        <router-link :to="{ name: 'otts' }" class="text-decoration-none text-white">OTT 지도</router-link>
      </b-nav-item>
      <b-nav-item v-if="isLoggedIn" >
        <v-icon> mdi-account-circle
          </v-icon>
        <router-link :to="{ name: 'profile', params: { username } }" class="text-decoration-none text-white">
          {{ currentUser.username }}'s Profile
        </router-link>
      </b-nav-item>
      <b-nav-item v-if="isLoggedIn">
        <router-link :to="{ name: 'logout' }" class="text-decoration-none text-white">Logout</router-link>
      </b-nav-item>
      </b-nav>
  </nav>
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

<style>
.nav {
  display: flex;
}
</style>
