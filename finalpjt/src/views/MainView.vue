<template>
  <div class="wrapper">

      <v-container class="main content">
  
          <div class="d-flex flex-column align-items-center">
          <img src = "@/assets/logo.jpg" class="logo">
            <div class="me-3">
              <router-link class="text-decoration-none" :to="{ name: 'login'}">
                    <v-btn>
                      로그인
                    </v-btn>
                    </router-link>
            </div>
              <router-link class="text-decoration-none" :to="{ name: 'signup'}">
                <v-btn >회원가입</v-btn>
              </router-link>

            </div>
        
      </v-container>

    </div>
</template>

<script>
export default {

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