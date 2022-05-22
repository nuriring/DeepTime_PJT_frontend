<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    methods: {
      ...mapActions(['logout'])
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    },
    created() {
      if (this.isLoggedIn) { //로그인했으면 로그아웃 잘 시켜주고
        this.logout()
      } else { //로그인 안했는데 로그아웃할려는놈에게..
        alert('잘못된 접근')
        this.$router.back() //이전화면으로 보내주는거임
      }
    },
  }
</script>

<style></style>
