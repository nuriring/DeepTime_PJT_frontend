<template>
  <div class="wrapper">
    <div class="loginbox">
    <v-container>
      <h1>LOGIN</h1>

      <account-error-list v-if="authError"></account-error-list>
    
      <v-form
        @submit.prevent="login(credentials)"
      >
        <v-text-field 
          v-model="credentials.username"
          label="ID"
          required
          color = indigo darken-4
          
        ></v-text-field>

        <v-text-field
          v-model="credentials.password"
          type="password"
          label="PASSWORD"
          required
          color = indigo darken-4
        ></v-text-field>


        <!-- <button class="mr-4 is-elevated has-bg theme--light v-size--default success">Signup</button> -->
        <v-btn type="submit" class="btn text-white fs-4 fw-bold">LOGIN</v-btn>

        

      

      
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
    background: #D9D9D9;
    width: 550px;
    height: 350px;
    border-radius: 20px;
  }
    .theme--light.v-btn.v-btn--has-bg{
    background-color:#1A237E ;
  }

 .btn{
      text-decoration: none;
      font-size: 2rem;
      display : inline-block;
      border-radius: 10px;
      padding: 5px 3px 10px 4px;
      transition: all 0.1s;
  }
  .btn:active{
      transform : translateY(3px);
  }
  div {
  font-family: 'Gowun Batang', serif;
}

</style>

