<template>
  <div class="wrapper">

      <v-container class="main content">
        
        <h1 class="text-center">DEEP TIME</h1>
  
          <div class="d-flex justify-content-center">
            <div class="me-3">
              <router-link :to="{ name: 'login'}">
                    <v-btn>
                      LOGIN
                    </v-btn>
                    </router-link>
            </div>
              <router-link :to="{ name: 'signup'}">
                <v-btn>SIGN UP</v-btn>
              </router-link>

            </div>
        
      </v-container>

    </div>
</template>

<script>
export default {

}
</script>

<style>

    .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #001D3D;
  }

  .content {
    font-family: system-ui, serif;
    font-size: 2rem;
    padding: 3rem;
    border-radius: 1rem;
    background: #ff6e6c;
  }

</style>