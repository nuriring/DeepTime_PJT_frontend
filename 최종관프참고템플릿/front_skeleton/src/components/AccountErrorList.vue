<template>
  <div class="account-error-list">
    <p v-for="(errors, field) in authError" :key="field">
      {{ field }}
      <ul>
        <li v-for="(error, idx) in errors" :key="idx"> <!--이중포문 : 장고가 에러를 줄때 형탤르 콘솔에서 확인하고 for문을 형태에 맞춰 돌리면됨-->
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

<style>
  .account-error-list {
    color: red;
  }
</style>
