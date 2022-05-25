<template>
  <div>
    <v-container>
      <h1>Login</h1>

      <account-error-list v-if="authError"></account-error-list>
    
      <v-form
        @submit.prevent="login(credentials)"
      >
        <v-text-field
          v-model="credentials.username"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="credentials.password"
          type="password"
          label="password"
          required
        ></v-text-field>


        <!-- <button class="mr-4 is-elevated has-bg theme--light v-size--default success">Signup</button> -->
        <b-button type="submit" class="primary">SIGNUP</b-button>

        

      

      
      </v-form>
    </v-container>

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

<style></style>
