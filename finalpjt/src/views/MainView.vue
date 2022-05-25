<template>
  <div class="wrapper">

      <v-container class="main content">
  
          <div class="d-flex flex-column align-items-center">
          <img src = "@/assets/logo.jpg" class="logo">
            <div class="me-3">
              <router-link class="text-decoration-none" :to="{ name: 'login'}">
                    <v-btn>
                      LOGIN
                    </v-btn>
                    </router-link>
            </div>
              <router-link class="text-decoration-none" :to="{ name: 'signup'}">
                <v-btn >SIGN UP</v-btn>
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
    font-family: system-ui, serif;
    font-size: 2rem;
    padding: 3rem;
    border-radius: 1rem;
    background: #001D3D;
  }

</style>