<template>
  <nav v-if="isLoggedIn">
    <ul>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'articles' }">게시판</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'otts' }">OTT 지도</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'profile', params: { username } }">
          {{ currentUser.username }}'s page
        </router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'logout' }">Logout</router-link>
      </li>
    </ul>
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

<style></style>
