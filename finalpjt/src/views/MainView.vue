<template>
  <div>
    <h2>DEEP TIME</h2>
      <router-link :to="{ name: 'login'}">
        <button>
          LOGIN
        </button>
        </router-link>
      <router-link :to="{ name: 'signup'}">
        <button>SIGN UP</button>
      </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>