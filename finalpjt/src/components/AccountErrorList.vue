<template>
  <div class="account-error-list">
    <p v-for="(errors, field) in authError" :key="field">
      <ul>
        <li v-for="(error, idx) in errors" :key="idx" class="text-decoration-none">
          {{ error }}
        </li>
      </ul>
    </p>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'AccountErrorList',
    computed: {
      ...mapGetters(['authError'])
    },
  }
</script>

<style scoped>
  .account-error-list {
    color: red;
  }
div {
  font-family: 'Gowun Batang', serif;
}  
</style>
