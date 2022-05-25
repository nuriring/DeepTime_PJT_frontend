<template>
  <div class="wrapper">
    <div class="loginbox">
    <v-container>
      <h1>로그인</h1>

      <account-error-list v-if="authError"></account-error-list>
    
      <v-form
        @submit.prevent="login(credentials)"
      >
        <v-text-field
          v-model="credentials.username"
          label="아이디"
          required
        ></v-text-field>

        <v-text-field
          v-model="credentials.password"
          type="password"
          label="비밀번호"
          required
        ></v-text-field>


        <!-- <button class="mr-4 is-elevated has-bg theme--light v-size--default success">Signup</button> -->
        <b-button type="submit" class="primary">로그인</b-button>

        

      

      
      </v-form>
    </v-container>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'LoginView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        }
      }
    },
  computed: {
      ...mapGetters(['authError'])
    },
    methods: {
      ...mapActions(['login'])
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
    font-family: system-ui, serif;
    font-size: 2rem;
    padding: 3rem;
    border-radius: 1rem;
    background: #001D3D;
  }
  .container {
    vertical-align: middle;
    margin-top: 3rem;
    width: 500px;
    height: 350px;

  }
  .loginbox {
    background: lightgrey;
    width: 550px;
    height: 400px;
    border-radius: 5%;
  }

</style>
