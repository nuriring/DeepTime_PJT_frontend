<template>
  <div class="main">
      <h2>DEEP TIME</h2>
      <div class="assign">
        <router-link :to="{ name: 'login'}">
          <button>
            LOGIN
          </button>
          </router-link>
        <router-link :to="{ name: 'signup'}">
          <button>SIGN UP</button>
        </router-link>


    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .main {
    top:50%;
    left:50%;

  }
  .assign {
    
  }
</style>