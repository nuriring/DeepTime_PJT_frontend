<template>
  <div class="wrapper ">

      <v-container class="main content">
  
          <div class="d-flex flex-column align-items-center">
          <img src = "@/assets/logo.jpg" class="logo mb-5">
          <div class="d-flex mt-5">
            <div class="me-3">
              <router-link class="text-decoration-none" :to="{ name: 'login'}">
                    <v-btn x-large class="btn display-1" style="width:171px">
                      LOGIN
                    </v-btn>
              </router-link>
            </div>
            <div>
              <router-link class="text-decoration-none" :to="{ name: 'signup'}">
                <v-btn x-large class="btn display-1" >SIGN IN</v-btn>
              </router-link>
            </div>

          </div>

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

  .btn{
      text-decoration: none;
      font-size: 2rem;
      display : inline-block;
      border-radius: 25px;
      padding: 5px 3px 10px 4px;
      transition: all 0.1s;

      

  }

  .btn:active{
      transform : translateY(3px);
  }
  .theme--light.v-btn.v-btn--has-bg{
    background-color:#D9D9D9 ;
  }

  

</style>