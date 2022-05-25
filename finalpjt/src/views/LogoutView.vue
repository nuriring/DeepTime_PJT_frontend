<template>
     <div class="wrapper">
      <v-container class="main content">
          <div class="d-flex flex-column align-items-center font-weight-bold font-italic text-white display-4">
            LOGOUT
          
            </div>
        
      </v-container>

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
      if (this.isLoggedIn) {
        this.logout()
      } else {
        alert('잘못된 접근')
        this.$router.back()
      }
    },
  }
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #001D3D;
  }
  .logo {
    width: 500px;
    height: auto;
  }
  .content {
    font-size: 2rem; 
    padding: 3rem;
    border-radius: 1rem;
    background: #001D3D;
  }
</style>
